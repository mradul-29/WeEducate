function openPage(){
    var x = document.getElementById("search").value;
    if(x === "linked list" || x==="tree" || x==="sorting" || x==="array"){
        window.open("subjects/ds.html");
    
    }

    else if(x === "algorithm"){
        window.open("subjects/algo.html");
    }

    else if(x === "java"){
        window.open("subjects/java.html");
    }

    else if(x === "python"){
        window.open("subjects/python.html");
    }

    else if(x === "c++"){
        window.open("subjects/c++.html");
    }

    else if(x === "webdev" || x==="frontend" || x==="html" || x==="css"){
        window.open("subjects/htm_css.html");
    }
    else{
        alert("No such course found. \n Please Search Again !!!");
    }
    

}