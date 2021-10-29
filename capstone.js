favoritesArray = []
commentsArray = []
emailArray = []
likedBool = []

$(function() {
    //On first load, set all arrays in session storage, and set "hasCodeRunBefore" as true
    if (sessionStorage.getItem("hasCodeRunBefore") === null) {
        sessionStorage.setItem("hasCodeRunBefore", true);
        sessionStorage.setItem("favorites", JSON.stringify(favoritesArray))
        sessionStorage.setItem("comments", JSON.stringify(commentsArray))
        sessionStorage.setItem("emails", JSON.stringify(emailArray))
        likedBool = [false, false, false, false, false, false, false]
        sessionStorage.setItem("liked", JSON.stringify(likedBool))    
    }

    //If not first load: 3 functions are triggered on load
    else {
        favoritesArray = JSON.parse(sessionStorage.getItem("favorites"))
        commentsArray = JSON.parse(sessionStorage.getItem("comments"))
        emailArray = JSON.parse(sessionStorage.getItem("emails"))
        likedBool = JSON.parse(sessionStorage.getItem("liked"))
        
        //Cycle through items in favoritesArray (see function on 'favoriteBtn' click below)
        if (favoritesArray.length > 0) {
            favoritesArray.forEach(function(p) {
                //Hides favorite buttons that have already been clicked. Fetch ID of the favorite div, target its child that has class '.favoriteButton' and hide
                let divID = p.id
                $('#' + divID).children(".favoriteBtn").hide()
            })
        }

        //Cycle through commentsArray and on load add each to the div ".commentBlock"
        if (commentsArray.length > 0) {
            commentsArray.forEach(function(p) {
                commentToAdd = p
                $(".commentBlock").append('<div><p>' + commentToAdd + '</p></div>')
            })
        }
        /*See function on button '.likeBtn' below. On load, this function cycles through an array of booleans and
        a 'like button' will be set as liked if its corrosponding index is true.*/
        let i = 0
        likedBool.forEach(function(l) {            
            if (l == true) {
                let elementID = i + 1
                $("#" + elementID).val("Liked \u2713")
            }
            i += 1
        }) 
    }

    //'Save for later' : Initialise an object that consists of which html page the div is located on, and its ID
    function FavoritesLink(filename, id) {
        this.filename = filename;
        this.id = id;
    }

    //On click of button with class "favoriteBtn"
    $(".favoriteBtn").click(function addToFav(f) {
        favoritesArray = JSON.parse(sessionStorage.getItem("favorites"))
        //Fetch button's parent div's ID
        let divId = f.target.parentNode.id
        //Fetch the name of the html page the button is located on (had to research this one)
        let fileName = String(location.href.split("/").slice(-1))
        //Set both as an object, add to favoritesArray and set in sessionStorage
        let newFavorite = new FavoritesLink(
            fileName, divId
        )
        favoritesArray.push(newFavorite)
        //Alert how many items have been added
        alert(`You now have ${favoritesArray.length} item(s) in your favorites list!`)
        sessionStorage.setItem("favorites", JSON.stringify(favoritesArray))
        //Hide button
        $(this).hide()
    })

    //On click of button with class 'commentButton'
    $(".commentBtn").click(function addComment() {
        commentsArray = JSON.parse(sessionStorage.getItem("comments"))
        //Add inputted comment to commentsArray and set in sessionStorage
        newComment = document.getElementById("comment").value
        commentsArray.push(newComment)
        sessionStorage.setItem("comments", JSON.stringify(commentsArray))
    })

    //Add email address to emailArray when '.emailBtn' is clicked, set in storage
    $(".emailBtn").click(function addEmail() {
        emailArray = JSON.parse(sessionStorage.getItem("emails"))
        newEmail = document.getElementById("emailInp").value
        emailArray.push(newEmail)
        sessionStorage.setItem("emails", JSON.stringify(emailArray))
    })

    //On click of '.likeBtn', value is changed to "liked" with a checked character
    $(".likeBtn").click(function like() {
        $(this).val("Liked \u2713")
        likedBool = JSON.parse(sessionStorage.getItem("liked"))
        //Get liked button's Id (all of which are numbered a number from 1-7), and subtract 1 from it
        let likedIndex = Number($(this).attr('id') - 1)
        //Find corrosponding index in an array of booleans and mark it true, so program knows on load of page to set that button as 'liked'
        likedBool[likedIndex] = true
        sessionStorage.setItem("liked", JSON.stringify(likedBool))
    })

    //Cycle through favoritesArray and add link of your favorite articles to the div "favoriteDiv" (on favorites.html)
    favoritesArray.forEach(function(p) {
        let favoriteFile = p.filename
        let favoriteID = p.id
        //Construct a link consisting of the name of the page and the div ID, set style "text align": "center" (note the chained function)
        $('.favoriteDiv').append("<div> <a href=\"" + favoriteFile + "#" + favoriteID + "\">" + favoriteID + "</a> </div>").css("text-align", "center")
    })

    /*(Note animation effect) Div of ".dropdown" (on contact.html) will slide down when div of class ".dropdownDiv" is hovered over,
    and when mouse is removed, slides back up.*/
    $(".dropdownDiv").hover(function() {
        $('.dropdown').slideDown()
    })
    $(".dropdownDiv").mouseleave(function() {
        $('.dropdown').slideUp()
    })
})

//REFERENCES:
//To fetch name of html page of element
//https://stackoverflow.com/questions/16611497/how-can-i-get-the-name-of-an-html-page-in-javascript/21343880