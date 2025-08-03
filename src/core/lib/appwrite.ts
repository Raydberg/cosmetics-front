import { Client, Account, Databases, Query } from "appwrite";

const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const databaseId = import.meta.env.VITE_DATABASE_ID;
const colecctionId = import.meta.env.VITE_COLLECTION_ID

if (!endpoint || !projectId || !databaseId) {
    console.error('❌ Variables de entorno faltantes:');
    console.log('ENDPOINT:', endpoint);
    console.log('PROJECT_ID:', projectId);
    console.log('DATABASE_ID:', databaseId);
}

const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId);

const account = new Account(client);
const db = new Databases(client);

export const Querys = Query;
export { client, account, db, databaseId as DB_ID,colecctionId as COLECCTION_ID };