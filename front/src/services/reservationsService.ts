const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function reservationsService(userID: string) {
    try {
        const response = await fetch(`${API_URL}/reservations/user/${userID}`);

        if (!response.ok) {
            throw new Error("Error retrieving reservations");
        }

        return await response.json();

    } catch (error) {
        console.error("reservationsService error:", error);
        return [];
    }
}