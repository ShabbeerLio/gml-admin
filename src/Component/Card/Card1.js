import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import "./Card.css";
import BlogDetail from "../BlogDetail/BlogDetail";
import host from "../../Host/Host";

const Card1 = ({ note, index, deleteItem, updateNote, showAlert }) => {
    const [showSubcategories, setShowSubcategories] = useState(false);

    if (!note) {
        return null;
    }

    const handleViewClick = () => {
        setShowSubcategories(!showSubcategories);
    };

    function limitWords(text, limit) {
        const words = text?.split(' ');
        return words?.length > limit ? words.slice(0, limit).join(' ') + '...' : text;
    }

    return (
        <>
            <tr className="cards">
                <td>{index + 1}</td>
                <td>{limitWords(note.category, 5)}</td>
                <td>{limitWords(note.categorydesc, 5)}</td>
                <td>{limitWords(note.tag, 5)}</td>
                <td><div className="card-image-blog">
                    {note.catimageUrl ? (
                        <img src={note.catimageUrl} alt={note.title} />
                    ) : (
                        <img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAB0VBMVEUAAAAA//8AgP9VVVVVqqpAQEArgNUkkts5jsYzmcwui9Enidg3ksgzmcwwj88tltIolMkzjMwxks4ul9FOTk4rldVSUlIvjtAvlNBPT08vlNBNTU0tk9IskNMulNEwkM8uktExlM4vkdAuktEuk9EukdExks4vk9AukdFOTk5NTU1MTEwuk9Ewkc9NTU0wk88vktAuktEuk9EwkdExks4vk9AukdAwks8vkdAuktEwks8wkdAvk9BOTk5NTU0wkc8vkdAvk9AvkdAukdEwk88vktBNTU0uk9Ewkc9OTk5OTk4wk89MTExNTU0vktBNTU0vkdBNTU1NTU1MTExOTk4wks9NTU1OTk4vk9Awks8vkdAvktAuk9Ewks8vkdAvk9AvktAwks8vkdAvktAwks8vktAuktEvktBNTU0vktBNTU1NTU1NTU0vktAvktAuktEvktAvktAwktAvktAvk9AvktAvktAvktBNTU0uk9FNTU1NTU0vktBOTk4vktBNTU0vk9AvktBNTU1OTk4vk9AvktAvktBNTU1NTU0vktAvktAvktAvktBNTU1NTU0vktBNTU0vktAvktBNTU0vktBNTU0vktAvktBNTU3////3vwTPAAAAmHRSTlMAAQIDAwQGBwkKCw0ODxARExQVFhcYGRsmKisrLS4yNTg5PD1CQ0RHSEtMTU5PT1BSVFZaW11eYGNlZmhpamttcXJ0dnd3f4CAg4aGh4iIiY6PkJSWlpeZm5ydoKGjp6mrrK+xs7a5u729vr6/wMTFxsfKzM3P09TV1dbX2NnZ2trd3t/f5OXq6uvt7vDy8vP09Pn7/P39/lgNyDMAAAABYktHRJqY32cSAAAB4klEQVRIx2NgGAV6ORNnEgEm5mjDdPjMrA7wIwIE1sz0htoxM5iZONcwh87UAjNyq5kZZAsbUUEiF4N7LapQuQkDc102WEt/AANDeKMvKphuwDMjDlUoo5GBIbAPrGWmBwNDdCqaG6YaC81QQRVybGNg8JiJpkVKTa3MQU2VDUVL5OQEJtxaSmaAwHRlZC1KM3xn6OPWwsQgwJIVz43isKgqhrxk3FoYGEqTphqh+IWr15nBYrIoHi32MyqYULSYzShKz5/hhFuLeeuE6TECyFqyKsLDw4urcGrh74oUMK23RtLC2K4O5Mj38OJ2GMnxQqoWu3Q4SFOAaOFLQYjFYtGiEw4HIRIQLez+CDEX6jjMqxsO2jUgWgSbEGJFWLTIWcGBpTBEC4sZQkwXixYmfjjggTmMEyHGjkVLxAwEMIRoEZ6EEGrFokVcDQ5UOKC2KCLEZKkQYsTmfSQtMgVoJUwCJ4MbZgmDrIVYANOS60E0yIVqIQmAtfQFEO8waNGXU8NMrA7WhkwwrT0zlEg9rGEzNSEs75l1Qa5EgKCGmZ4w3VqZ/cT4vD9TE3foTxMDUSJTiI+xSkgtwpBTTawO6Zk2EIbtTEliUwXEXcS6DJQqOpph6aOlE0QS0IIzjYwCKAAAIYSIhTiPKfoAAAAASUVORK5CYII="
                        />
                    )}
                </div></td>
                <td>
                    <div className="card2-button">
                        <p onClick={() => updateNote(note)}><MdEdit /></p>
                        <p onClick={() => deleteItem(note._id)}><MdDelete /></p>
                    </div>
                </td>
                <td className="view">
                    <button className="btn btn-secondary" onClick={handleViewClick}>
                        {showSubcategories ? "Hide" : "View"}
                    </button>
                </td>
            </tr>
            {showSubcategories && (
                <tr className="full-width-row">
                    <td colSpan="7">
                        <BlogDetail note={note} showAlert={showAlert} />
                    </td>
                </tr>
            )}
        </>
    );
};

export default Card1;