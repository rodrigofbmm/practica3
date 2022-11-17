export type user = {
    name: string;
    email: string;
    password: string;
    createdAt?: string;
    cart?: book[];
};

export type book = {
    title: string;
    author: string;
    pages: number;
    ISBN?: string;
};

export type author = {
    name: string;
    books?: book["ISBN"];
};