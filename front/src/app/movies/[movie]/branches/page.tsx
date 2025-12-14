"use client";

import { apiClient } from '@/services/apiClient';
import { Branch } from '@/types/branch';
import BranchList from '@/components/BranchList';
import { useEffect, useState } from 'react';

export default function BranchSelectionPage({
  params,
}: {
  params: Promise<{ movie: string }>;
}) {
  const [movie, setMovie] = useState<string>('');
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const { movie: movieId } = await params;
      setMovie(movieId);

      const api = apiClient();
      const branchesData = await api.get<Branch[]>('branches', {
        disableCache: true,
      });
      
      setBranches(branchesData);
      setLoading(false);
    };

    loadData();
  }, [params]);

  const getLinkHref = (branchId: string) => {
    return `/movies/${movie}/branches/${branchId}/showtimes`;
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