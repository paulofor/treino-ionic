export interface Feedback {
    firstname: string;
    lastname: string;
    telnum: number;
    email: string;
    agree: boolean;
    contact : string;
    message: string;
};

export const ContactType = ['Nenhum', 'Tel'  , 'Email'];

