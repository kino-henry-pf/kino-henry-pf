"use client";

import { apiClient } from '@/services/apiClient';
import { Branch } from '@/types/branch';
import BranchList from '@/components/BranchList';
import { useEffect, useState } from 'react';

export default function BranchSelectionPage({
}: {
  params: Promise<{ movie: string }>;
}) {

  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {

      const api = apiClient();

      const branchesData = await api.get<Branch[]>('branches', {
        disableCache: true,
      });
      
      setBranches(branchesData);
      setLoading(false);
    };

    loadData();
  }, []);

 
  const getLinkHref = (branchId: string) => {
    return `/branches/${branchId}`;
  };

  return (
    <BranchList
      branches={branches}
      getLinkHref={getLinkHref}
      loading={loading}
      title="Select a branch"
    />
  );
}