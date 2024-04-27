import config from "../config/config";
import { Client, Databases, ID, Storage, Query } from "appwrite"
class Database {
    client = new Client()
    database
    storage
    constructor() {
        this.client
            .setEndpoint(config.Project_url)
            .setProject(config.Project_id)
        this.database = new Databases(this.client)
        this.storage = new Storage(this.client)
    }
    async addProduct(name, discountedPrice, description, imageId, category) {
        try {
            const session = await this.database.createDocument(
                config.Database_id,
                config.Product_ingredients,
                ID.unique(),
                {
                    name, discountedPrice, description, imageId, category
                }
            )
            return session
        } catch (error) {
            throw error
        }
    }
    async delProduct(productId) {
        try {
            const session = await this.database.deleteDocument(
                config.Database_id,
                config.User_cart,
                productId
            )
            return session
        } catch (error) {
            throw error
        }
    }
    async getProduct(documentId) {
        try {
            const session = this.database.getDocument(
                config.Database_id,
                config.Product_ingredients,
                documentId
            )
            return session
        } catch (error) {
            throw error
        }
    }
    async listAllProducts() {
        try {
            const session = await this.database.listDocuments(
                config.Database_id,
                config.Product_ingredients

            )
            return session
        } catch (error) {
            throw error
        }
    }
    // add to cart functionality
    async addCart(documentId, userMail, quantity) {
        try {
            const session = await this.database.createDocument(
                config.Database_id,
                config.User_cart,
                ID.unique(),
                {
                    documentId,
                    userMail,
                    quantity
                }
            )
            return session
        } catch (error) {
            throw error
        }
    }
    async updateCart(productId, documentId, userMail, quantity) {
        try {
            await this.database.updateDocument(
                config.Database_id,
                config.User_cart,
                productId,
                {
                    documentId,
                    userMail,
                    quantity
                }
            )
            return true
        } catch (error) {
            throw error
        }
    }
    async cartDetails() {
        try {
            const session = await this.database.listDocuments(
                config.Database_id,
                config.User_cart,
            )
            return session
        } catch (error) {
            throw error
        }
    }
    async delCart(fileId) {
        try {
            const session = await this.database.deleteDocument(
                config.Database_id,
                config.User_cart,
                fileId
            )
            return session
        } catch (error) {
            throw error
        }
    }
    async emptyCart(mail) {
        try {
            const session = await this.database.listDocuments(
                config.Database_id,
                config.User_cart
            )
            if (session) {
                const filterData=session.documents.filter((document)=> document.userMail === mail)
                filterData.map((productId) => {
                  this.delCart(productId.$id);
                })
            }
            return true;
        }
        catch (error) {
           throw error
        }
    }

    // file uploading 

    async uploadImage(file) {
        try {
            let session = await this.storage.createFile(config.Bucket_id, ID.unique(), file)
            return session;
        } catch (error) {
            throw error
        }
    }

    getFilePre(fileId) {
        return this.storage.getFilePreview(config.Bucket_id, fileId);
    }
}
const databaseService = new Database();
export default databaseService;