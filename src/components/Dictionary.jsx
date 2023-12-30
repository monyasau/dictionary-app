import { useState, useEffect } from "react";
import axios from "axios";

let Dictionary = () => {
  const [userInput, setUserInput] = useState("hello");
  const [inputValue, setInputValue] = useState("");
  const [dictData, setDictData] = useState(null);

  const updateUserInput = (event) => {
    if (event.keyCode === 13 || event.type === "click") {
      setUserInput(event.target.value);
    } else {
      //for button
      setInputValue(event.target.value);
    }
  };
  const buttonUpdateDict = () => {
    setUserInput(inputValue);
  };

  const fetchDictionaryData = () => {
    
    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${userInput}`)
      .then(function (response) {
        const newData = response.data;
        setDictData(newData);
        console.log(newData);
      })
      .catch(function (error) {
        setDictData(null);
      });
  };
  useEffect(() => {
    fetchDictionaryData();
  }, [userInput]);

  return (
    <>
      <div className="">
        <div className="max-w-screen-sm mx-auto py-12">
          <div className="w-full border rounded h-16 md:text-3xl text-2xl">
            <input
              placeholder="Enter a word here to search"
              className="bg-[#f4f4f4] md:w-[96%] w-[85%]  h-full px-4"
              type="text"
              autoFocus
              onKeyUp={updateUserInput}
            />
            <button className="md:w-[4%] w-[15%] " onClick={buttonUpdateDict}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#b9b9b9"
                className="w-6 mx-auto h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </div>
          <h1 className="text-[#455] mb-3 text-3xl font-bold text-center">
            {userInput.toLocaleUpperCase()}
          </h1>

          {dictData ? (
            <div className="">
              <p className="pl-6">
                Definitions, Synonyms, Phonetics & Usage Examples of <span className="font-bold"> {userInput}</span> :
              </p>

              {dictData[0].meanings[0].synonyms.length? (
                <div className="border my-4 p-6">
                  {<span className="font-bold"> Synonyms:</span>}
                  {
                    dictData[0].meanings[0].synonyms.map((synonym,synonymIteration)=>(
                      <span key={synonymIteration} className="text-[#444] text-base"> {synonym},</span>
                    ))
                  }
                </div>
              ):
              <div className="border my-4 p-6">
                <span className="font-bold">Synonyms: </span> <span className="text-[#444]"> No synonyms found</span>
              </div>
              }

              {dictData[0].meanings.map((meaning, i) => (
                <div key={i} className="border my-2 p-6">
                  <h4>
                    ({dictData[0].meanings[i].partOfSpeech.toUpperCase()})
                  </h4>

                  {dictData[0].meanings[i].definitions.map((definition, j) => (
                    <>
                    <div key={j} className="border my-4 grid grid-cols-2">
                      <div className="border px-1  flex flex-wrap items-center justify-center">
                        <p>
                          <span className="font-bold">Definition: </span>
                          {definition.definition}
                        </p>
                        {definition.example && (
                          <p>
                            <span  className="font-bold">Usage Example: </span>
                            {definition.example}
                          </p>
                        )}
                      </div>
                      <div className="border px-1 flex flex-wrap items-center justify-center">
                        <p>
                          <span  className="font-bold">Phonetic: </span> {dictData[0].phonetic}
                        </p>
                       {dictData && dictData[0]?.phonetics && dictData[0]?.phonetics[0] && (
  <audio controls className="w-[80%]">
    <source src={dictData[0].phonetics[0].audio} type="audio/mp3" />
    Your browser does not support or has disabled playing audio
  </audio>
)}

                      </div>
                    </div>
                    </>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="text-center border text-4xl">
                Sorry, definition not found 🥺
              </div>
              <div className="md:text-1xl md:my-8 w-[90%] mx-auto text-center text-base">
                Try checking your internet connection, if that doesn't work, try
                again later
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Dictionary;
