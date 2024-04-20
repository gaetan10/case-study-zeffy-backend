const fs = require('fs');

// controller to get the list of all donations 
exports.getDonations = async (req,res,next) => {

    let page = Number(req.query.page)
    const itemPerPage = Number(req.query.perPage)

    try {
        const donationData = await JSON.parse(fs.readFileSync('donations.json', 'utf-8'));
        const paginatedDonations = donationData.slice((((page-1)*itemPerPage)),((page*itemPerPage)));
         
        res.status(200).json({
            message: 'Donations list successfully fetched',
            donations: paginatedDonations
        });      
    } catch (error) {
        const err = new Error('An error occured to fetch data.');
        err.code = 500;
        return next(err)
    }
};