// base - Product.find() 
// base - Product.find(email: {"hitesh@lco.dev"}) 
//bigQ - //search=coder&page=2&category=shortsleeves&rating[gte]=4 
// &price[lte]=999&price[gte]=199&limit=5 

class WhereClause {
    constructor(base, bigQ) {
        this.base = base;
        this.bigQ = bigQ;
    }

    search (){
        const searchword = this.bigQ.search ? {
            name : {
                $regex: this.bigQ.search,
                $option: 'i'
            }
        } : {}

        this.base = this.base.find({...searchword})
        return this;
    }

    filter(){
        const copyQ = {...this.bigQ}

        delete copyQ['search'];
        delete copyQ['limit'];
        delete copyQ['page'];

        // convert big Q into a string => copyQ
        let stringOfCopyQ = JSON.stringify(copyQ)

        stringOfCopyQ = stringOfCopyQ.replace(/\b(gte | lte | lt | gt)\b/g, m=> `$${m}`)

        const jsonofCopyQ = JSON.parse(stringOfCopyQ)

        this.base = this.base.find(jsonofCopyQ)

    }

    pager(resultperPage){
        let currentPage = 1;
        
        if(this.bigQ.page){
            currentPage= this.bigQ.page
        }

        const skipVal = resultperPage * (currentPage - 1)
        this.base =this.base.limit(resultperPage).skip(skipVal);
    }

    
}

export default WhereClause