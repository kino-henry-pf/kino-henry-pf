export interface userSessionInterface {
    message: boolean;
    access_token: string;
    user: {
        id: string;
        name: string;
        email: string;
        role: string
    };
};