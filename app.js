const base_url= "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";

const dropdowns= document.querySelectorAll(".dropdown select")

const btn= document.querySelector("form button");

const fromCurr= document.querySelector(".from select");
const toCurr= document.querySelector(".to select");

const msg=document.querySelector(".msg");


// for(code in countryList){
//     console.log(code, countryList[code]);
// }


// we want 'from' to be USD and 'to' be BDT (if else if condition)
// added all the countrys' code in the option
for(let select of dropdowns){
    for (currCode in countryList){
        let newOption= document.createElement("option");
        newOption.innerText= currCode;
        newOption.value=currCode;
        if (select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        } else if(select.name==="to" && currCode==="BDT"){
            newOption.selected="selected";
        }

        select.append(newOption);
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}
// whenever our select is changing we will add eventListener, there is en avt object and we will call the update flag fucntion to change the targeted flag

// whenever our select is change we want the flag to be changed as well
const updateFlag=(element)=>{
    let currCode= element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}


// we dont want the page to refresh all the time when we click on the exchange rate button
btn.addEventListener("click", async(evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    // default
    if(amtVal==="" || amtVal<1){
        amtVal=1;
        amount.value="1";
    }
    const URL= `${base_url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response= await fetch(URL);
    let data = await response.json();
    let rate=data[toCurr.value.toLowerCase()];
    console.log(rate);

    let finalAmount= amtVal*rate;
    msg.innerText= `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
})
