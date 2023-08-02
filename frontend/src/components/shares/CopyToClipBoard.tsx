import React, {useState} from "react";
import {AppUtil} from "../../utils/AppUtil.tsx";
import {TiTick} from "react-icons/ti";
import {MdContentCopy} from "react-icons/md";

const CopyToClipBoard = (props: any) => {
    const [copied, setCopied] = useState<boolean>(false);

    const handleCopyClick = () => {
        AppUtil.copyToClipBoard(props.name);
        setCopied(true);
        setTimeout(() => setCopied(false), 5000);
    };

    return (
        <>
            {copied ? (
                <TiTick className="col-1 mt-1 me-2" style={{fontSize: '2rem'}}/>
            ) : (
                <MdContentCopy
                    className="col-1 mt-1 me-2"
                    style={{fontSize: '2rem'}}
                    onClick={handleCopyClick}
                />
            )}
        </>
    );
};

export default CopyToClipBoard;
