import {table, getMinifiedRecord} from './utils/Airtable'
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import OwnsRecord from "./middleware/OwnsRecord"

export default OwnsRecord(async (req, res) => { 
    const { id } = req.body;
    const {user} = await getSession(req, res);

    try{
        const deletedRecords = await table.destroy([id]);
        res.statusCode = 200;
        res.json(getMinifiedRecord(deletedRecords[0]));

    } catch (err) {
        console.log(err)
        res.statusCode = 500;
        res.json({msg: "Something went wrong" })
    }
})