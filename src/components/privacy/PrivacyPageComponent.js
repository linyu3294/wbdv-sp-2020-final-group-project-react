import React from "react";

class PrivacyPageComponent extends React.Component {


    render() {
        return (
            <div class="jumbotron">
                <h1 class="display-4">Privacy</h1>
                <p class="lead">Please read our privacy practices to get a better idea of how we use
                your data on our platform.</p>

                <h4>What data do we collect?</h4>
                <p class="lead">We collect your personal details such as first name, last name, 
                email, phone number, whether you are a renter or a landlord, username, password, 
                and the listings / properties that you have shown interest in. In future iterations,
                 we will also be storing your reviews of listings and of other users 
                 (reviews of landlords you have had if you are a renter, and reviews of renters 
                 you have had if you are a landlord). If you are a landlord and you have added a 
                 listing to our platform, we will collect details about that listing including 
                 address, price to rent, the listings vacancy status, number of bedrooms, and 
                 number of bathrooms as well as which landlord posted that listing.</p>

                <h4>What do we do with this data?</h4>
                <p class="lead">We collect personal details about a user in order to allow us to 
                create a user experience that is the core of our platform-- giving a personalized 
                feel to the process of finding renters / landlords. Having those personal details 
                is what allows us to create profile pages that users can look at in order to see 
                if they would match well with one another. Moreover, having data about what listings 
                renters have liked and what renters landlords have liked allows us to prioritize 
                search results and make suggestions about what listings / users that user will 
                probably like too. We will also be able to perform analytics on the listing data 
                for business intelligence for things like what is the average length of time a 
                listing goes unrented, what types of qualities lead to renters staying at the same 
                home for longer periods of time, etc.</p>

                <h4>Why are these data policies reasonable?</h4>
                <p class="lead">We feel that these policies are reasonable because they are very 
                similar to the policies that would be in place were this an in-person real estate 
                service. The information we request when registering as a user is similar to if not 
                less invasive than those of an in-person service. For example, when one signs up with
                a real estate service to find an apartment, it is not uncommon for them to request
                a social security number, birthday, co-signer information, etc. Therefore, our 
                practices are very much in like with current industry practices. The same goes 
                when creating a listing-- we only request information that is pertinent to the 
                process of displaying information and making suggestions to users that a real 
                estate agent would be doing. 
                <br/>
                We do, however, store reviews and ‘likes’ which a real estate service would likely 
                not be able to do. However, the reviews that users post are intended to be for 
                public consumption and thus, no expectation of privacy is present. We also believe 
                that the collection of user ‘likes’ to create personalized suggestions of listings 
                and renters is something that a user wants out of our platform. Said another way, 
                these are contextual norms that are common to the industry where you would hope 
                that your real estate agent would get to know your wants and likes, and then lead 
                you towards those resources. </p>
             </div>
        )
    }
}

export default PrivacyPageComponent