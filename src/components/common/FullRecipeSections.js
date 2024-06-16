import React, { useState, useEffect } from 'react';
import { IoMdArrowDropdownCircle , IoIosArrowDropupCircle  } from "react-icons/io";
import '../FullRecipe/fullrecipe.css'

const Section = ({ title, fetchData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState(null);

    const toggleOpen = async () => {
        setIsOpen(!isOpen);
        if (!isOpen && !data) {
            const fetchedData = await fetchData();
            setData(fetchedData);
        }
    };

    return (
        <div className="section">
            <div className="fullrecipe-card-title" onClick={toggleOpen}>
                <span style={{ fontSize: '17px', padding: '10px' }}>{title}</span>
                <span>{isOpen ? <IoIosArrowDropupCircle  /> : <IoMdArrowDropdownCircle  />}</span>
            </div>
            {isOpen && (
                <div>
                    {data ? data : <p>Loading...</p>}
                </div>
            )}
        </div>
    );
};

export default Section;
