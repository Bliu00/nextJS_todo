import {table, minifyRecords} from './utils/airtables'
// import auth0 from'./auth/[...auth0]'
import {getSession, withApiAuthRequired} from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async (req, res) => { 
    const {description} = req.body;
    const {user} = await getSession(req);
    
    try{
        const createdRecords = await table.create([{fields: {description, userId: user.sub}}]);

        //why do we need this part?
        const createdRecord = {
            id: createdRecords[0].id,
            fields: createdRecords[0].fields
        }
    
        res.statusCode = 200;
        res.json(createdRecords[0]);
    } catch (err) {
        console.log(err)
        res.statusCode = 500;
        res.json({msg: "Something went wrong" })
    }
})

