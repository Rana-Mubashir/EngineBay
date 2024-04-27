import config from '../config/config'
import { Client, Account,ID } from "appwrite";
class Auth {
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint(config.Project_url)
            .setProject(config.Project_id)
        this.account = new Account(this.client)
    }
    async createAccount({name, mail, pass}) {
        try {
            const session = await this.account.create(ID.unique(), mail, pass, name)
            return session
        } catch (error) {
            throw error;
        }
    }
    async getLogIn({mail, pass}) {
        try {
            const session = await this.account.createEmailPasswordSession(mail, pass)
            return session;
        } catch (error) {
            throw error
        }
    }
    async getLogOut() {
        try {
            const session = await this.account.deleteSessions()
            return session
        } catch (error) {
            throw error
        }
    }
    async getCurrentUser(){
        try {
            const session=await this.account.get()
            return session
        } catch (error) {
            throw error
        }
    }
}
const authService=new Auth();
export default authService