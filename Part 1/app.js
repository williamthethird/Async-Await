// #**************************
// #Part 1: Number Facts
// #**************************



// let favNumber = 7;
// let baseURL = "http://numbersapi.com";

//1.
// $.getJSON(`${baseURL}/${favNumber}?json`).then(data => {
//     console.log(data);
// });

//2.
// let favNumbers = [4, 5, 6];
// $.getJSON(`${baseURL}/${favNumbers}?json`).then(data => {
//     console.log(data);
// });


//3.
// Promise.all(
//     Array.from({ length: 5 }, () => {
//         return $.getJSON(`${baseURL}/${favNumber}?json`);
//     })
// ).then(facts => {
//     facts.forEach(data => $("body").append(`<p>${data.text}</p>`));
// });


// Promise.all([
//     $.getJSON(`${baseURL}/${favNumber}?json`),
//     $.getJSON(`${baseURL}/${favNumber}?json`),
//     $.getJSON(`${baseURL}/${favNumber}?json`),
//     $.getJSON(`${baseURL}/${favNumber}?json`),
//     $.getJSON(`${baseURL}/8?json`),
// ]).then(facts => {
//     $("body").append(`<p>${facts[0].text}</p>`)
//     $("body").append(`<p>${facts[1].text}</p>`)
//     $("body").append(`<p>${facts[2].text}</p>`)
//     $("body").append(`<p>${facts[3].text}</p>`)
//     $("body").append(`<p>${facts[4].text}</p>`)
//     console.log(facts)
// });



// #**************************
// #Part 2: Deck of Cards
// #**************************

$(function () {
    let baseURL = 'https://deckofcardsapi.com/api/deck';

    // 1.
    async function part1() {
        let data = await $.getJSON(`${baseURL}/new/draw/`);
        let { suit, value } = data.cards[0];
        console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    }

    // 2.
    async function part2() {
        let firstCardData = await $.getJSON(`${baseURL}/new/draw/`);
        let deckId = firstCardData.deck_id;
        let secondCardData = await $.getJSON(`${baseURL}/${deckId}/draw/`);
        [firstCardData, secondCardData].forEach(card => {
            let { suit, value } = card.cards[0];
            console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
        });
    }

    // 3.
    async function setup() {
        let $btn = $('button');
        let $cardArea = $('#card-area');

        let deckData = await $.getJSON(`${baseURL}/new/shuffle/`);
        $btn.show().on('click', async function () {
            let cardData = await $.getJSON(`${baseURL}/${deckData.deck_id}/draw/`);
            let cardSrc = cardData.cards[0].image;
            let angle = Math.random() * 90 - 45;
            let randomX = Math.random() * 40 - 20;
            let randomY = Math.random() * 40 - 20;
            $cardArea.append(
                $('<img>', {
                    src: cardSrc,
                    css: {
                        transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
                    }
                })
            );
            if (cardData.remaining === 0) $btn.remove();
        });
    }
    setup();
});


// #**************************
// #Part 3: Pokemon
// #**************************




