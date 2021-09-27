import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import {table, getMinifiedRecord} from './utils/airtable'
import OwnsRecord from "./middleware/OwnsRecord"

export default OwnsRecord(async (req, res) => { 
    const { id, fields } = req.body;
    const {user} = await getSession(req, res)

    try{

        const updatedRecords = await table.update([{id, fields}]);
    
        res.statusCode = 200;
        res.json(getMinifiedRecord(updatedRecords[0]));
    } catch (err) {
        console.log(err)
        res.statusCode = 500;
        res.json({msg: "Something went wrong" })
    }
})