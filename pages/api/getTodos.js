import {table, minifyRecords} from './utils/airtables'
import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async (req, res) => { 
    const {user} = await getSession(req, res);
    let records = []    
    try{
        if(user){
            records = await table.select({
                filterByFormula: `userID = '${user.sub}'`
            }).firstPage();
        }

        const minifiedRecordsJson = minifyRecords(records);
    
        res.statusCode = 200;
        res.json(minifiedRecordsJson);
    } catch (err) {
        res.statusCode = 500;
        res.json({msg: "Something went wrong" })
    }

})