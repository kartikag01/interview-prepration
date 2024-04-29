import React, { useRef } from 'react';
import FileNameContext from '../contexts/FileNameContext';

function FileDataItem(props) {
    const { folder } = props;
    const [__folder, setFolder] = React.useState({
        ...folder
    });
    const { name, files, isOpen } = __folder;

    const toggleOpen = () => {
        setFolder(preVal => ({ ...preVal, isOpen: !preVal.isOpen })); // O(1)
    }

    const makeItFolder = (e) => {
        setFolder(preVal => ({ ...preVal, files: [], isOpen: false })); // O(1)
    }

    return (
        <li>
            <button
                onClick={files ? toggleOpen : null}
                onDoubleClick={!files ? makeItFolder : null}
            >
                {name} {files && <span>[{isOpen ? `-` : `+`}]</span>}
            </button>
            {isOpen && files && <FileList folderStructure={files}
            // {...{ fileName, setFileName }} 
            />}
        </li>
    );
}

function FileData(props) {
    const { folderStructure, fileName, setFileName } = props;
    return folderStructure.map((folder, index) => {
        return <FileDataItem key={index} {...{ folder, fileName, setFileName }} />
    });
}

function FileList(props) {
    const { folderStructure: initialFolderStructure } = props;
    const [folderStructure, setFolderStructure] = React.useState(initialFolderStructure);
    const ref = useRef();
    ref.current = useAddNewFile(setFolderStructure);

    return (
        <ul>
            <FileData {...{
                folderStructure,
                // fileName, setFileName
            }}
            />
            <li>
                <button onClick={ref.current}>+</button>
            </li>
        </ul>
    )
}

function useAddNewFile(setFolderStructure) {
    const { fileName, setFileName } = React.useContext(FileNameContext);

    const addNewFile = () => {
        if (!fileName.length) {
            alert("Please enter a file name in the input box");
            return;
        }
        setFolderStructure(preValue => preValue.concat({
            "name": fileName
        })); // O(1)
        setFileName('');
    }
    return addNewFile;
}

export default React.memo(FileList);


// =====

import React from 'react'
import FileNameContext from '../contexts/FileNameContext';
import initialData from '../utils/initialData'
import FileList from './FileList';

function File() {
    const [fileName, setFileName] = React.useState('');
    // [2,3, 1]
    // data[2].files.[3].
    return (
    <FileNameContext.Provider value= {{ fileName, setFileName }
}>
  <div className='layout-row justify-content-between' >
    <ul data - testid="files" >
      <FileList 
                {
        ...{
          folderStructure: initialData,
          // fileName, setFileName
        }
      }
      />
      </ul>
      < input
data - testid="input-box"
className = 'mt-15 mr-35 w-15'
style = {{ borderColor: "black" }}
type = "text"
placeholder = 'Enter an item'
value = { fileName }
onChange = { e => setFileName(e.target.value) }
  />
  </div>
  < /FileNameContext.Provider >
  )
}

export default File


    ===== 




const initialData = [
    {
        "name": "node_modules"
    },
    {
        "name": "public",
        "isOpen": false,
        "files": [
            {
                "name": "index.html",
                "isOpen": false
            }
        ]
    },
    {
        "name": "src",
        "isOpen": true,
        "files": [
            {
                "name": "App.js"
            },
            {
                "name": "components",
                "isOpen": false,
                "files": [{ "name": "File.js" }]
            }
        ]
    },
    {
        "name": "Git",
        "isOpen": false,
        "files": [
            {
                "name": ".gitignore"
            },
            {
                "name": "Commits",
                "isOpen": false,
                "files": [{ "name": "First commit" }]
            }
        ]
    }
]

export default initialData;

