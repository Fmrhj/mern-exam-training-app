const IndexController = {}

IndexController.index = (req, res) => {
        res.status(200).json(
            {
                message: 'You are in home'
            })
        }



export {IndexController}