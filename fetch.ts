
import fetch from "node-fetch";

async function fetchWithProfessor(profName) {
    const highRes = await fetch(
        `https://www.ratemyprofessors.com/search/teachers?query=${encodeURIComponent(profName)}&sid=${btoa(`School-1273`)}`
    )
    return await highRes.text();
}



function extractProfessorIdFromSearchResults(request, texts : string[]) {
    // console.log("Extracting professor IDs from search results",texts)
    var profIds : string[] = [];

    texts.forEach(text => {
        console.log(text);
        const regex = /"legacyId":(\d+).*?"firstName":"(\w+)","lastName":"(\w+)"/g;
        for (const match of text.matchAll(regex)) {
            if (request.profNames.includes(match[2] + " " + match[3])) {
                profIds.push(match[1]);
            }
        }
    })
    return profIds;
            
}

let mockRequest = {
    profNames: "Scott Dollinger"
}
let text : string = await fetchWithProfessor(mockRequest.profNames);
let ids : string[] = extractProfessorIdFromSearchResults(mockRequest, [text]);

console.log("IDs are " + ids);