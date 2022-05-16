// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

const catId_array = [];
const test = [];
const categories = [];

const btn = document.querySelector(".btn");
btn.addEventListener("click", fillTable);

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

function getCategoryIds(response_data) {
    for (let ids of response_data) {
        // console.log(ids.category_id);
        catId_array.push(ids.category_id);
    }
    return catId_array;
}


/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */
function getCategory(response2_data){

    let testobj = {}

    const sample_title = response2_data.title
    // console.log(sample_title)
    testobj.title = sample_title;



    const clue_array = [];

    const { clues } = response2_data

    for (let val of clues) {
        clue_array.push({ 
            question: val.question,
            answer: val.answer,
            invalid_count: val.invalid_count,
            value: val.value,
            category_id: val.category_id
        })
    }

    testobj.clues = clue_array;
    categories.push(testobj)

    return categories
    
    // Does it print out values??? Idk how to solve that 
}
/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */


async function fillTable() {

    const response = await axios.get("http://jservice.io/api/random?count=5");
    // Got the data, now time to recall it
    console.log(response)

    getCategoryIds(response.data);

    console.log(catId_array);


    for (let _urls of catId_array) {
        let url = `http://jservice.io/api/category/?id=${_urls}`
        // console.log(url);
        let response2 = await axios.get(url);
        console.log(response2);

        getCategory (response2.data);

    }

    const tableFinder = document.querySelector("table")
    
    const tableHead = document.createElement("thead");
    const tableBody = document.createElement("tbody");
    tableFinder.appendChild(tableHead)
    tableFinder.appendChild(tableBody)
    

    const tableTopRow = document.createElement("tr");
    tableHead.appendChild(tableTopRow)
    console.log(tableFinder);



    
    for (let topic of categories){

        console.log(topic);

        const catCells = document.createElement("td");
        catCells.setAttribute("id", "col")
        catCells.innerText = topic.title;
        tableTopRow.appendChild(catCells);
    }

    for (let i=0; i < 5; i++){
        const aCells = document.createElement("tr")
        tableBody.appendChild(aCells)

        for (let j=0; j < 5; j++){
            const bCells = document.createElement("td");
            bCells.innerText = "?";
            bCells.addEventListener("click", function test (){
                if (bCells.innerText === "?")
                bCells.innerText = categories[j].clues[i].question
                else { bCells.innerText = categories[j].clues[i].answer}
            });
            aCells.appendChild(bCells);
        }
    }


}



/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {

}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {
    const name = document.getElementById("board");
    name.remove();
}


/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
}

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODO

