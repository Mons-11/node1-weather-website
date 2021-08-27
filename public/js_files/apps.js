const search_btn=document.querySelector('button');
const search=document.querySelector('input');
const success=document.querySelector('#msg1')
const fail=document.querySelector('#msg2')

search_btn.addEventListener('click',(e)=>{
    e.preventDefault();
    msg1.textContent='Loading...'
    msg2.textContent=' '
    const url='/weather?address='+search.value

    fetch(url).then((response)=>{

    response.json().then((data)=>{
        if(data.error){
            console.log(data.error);
            msg1.textContent=data.error;
        }
        else{
            console.log(data.location);
            console.log(data.forecast);
            msg1.textContent=data.location
            msg2.textContent=data.forecast
        }
        
    })
})

})

fetch('https://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data);
    })
})


