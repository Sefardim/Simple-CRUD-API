export interface IUserInterface {
    username: string;
    age: number;
    hobbies: string[];
}

export interface IUserInterfaceWithId extends IUserInterface {
    id: string;
}
