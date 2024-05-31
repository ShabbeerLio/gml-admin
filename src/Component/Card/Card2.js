import React, { useContext } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import "./Card.css"

const Card2 = (props) => {
    const { deleteItem, note, updateNote } = props;

    return (
        <>
            <div className="col-md-3 " style={{ color: "black" }}>
                <div className="card">
                    <div className="card-image">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAB0VBMVEUAAAAA//8AgP9VVVVVqqpAQEArgNUkkts5jsYzmcwui9Enidg3ksgzmcwwj88tltIolMkzjMwxks4ul9FOTk4rldVSUlIvjtAvlNBPT08vlNBNTU0tk9IskNMulNEwkM8uktExlM4vkdAuktEuk9EukdExks4vk9AukdFOTk5NTU1MTEwuk9Ewkc9NTU0wk88vktAuktEvkdAwk88wks8vkdAuktEwks8uk9Ewks8wkdAvk9BOTk5NTU0wkc8vkdAvk9AvkdAukdEwk88vktBNTU0uk9Ewkc9OTk5OTk4wk89MTExNTU0vktBNTU0vkdBNTU1NTU1MTExOTk4wks9NTU1OTk4vk9Awks8vkdAvktAuk9Ewks8vkdAvk9AvktAwks8vkdAvktAwks8vkdAwks8vktAuktEvktBNTU0vktBNTU1NTU1NTU0vktAvktAuktEvktAvktAwktAvktAvk9AvktAvktAvktBNTU0uk9FNTU1NTU0vktBOTk4vktBNTU0vk9AvktBNTU1OTk4vk9AvktAvktBNTU1NTU0vktAvktAvktAvktBNTU1NTU0vktBNTU0vktAvktBNTU0vktBNTU0vktAvktBNTU3////3vwTPAAAAmHRSTlMAAQIDAwQGBwkKCw0ODxARExQVFhcYGRsmKisrLS4yNTg5PD1CQ0RHSEtMTU5PT1BSVFZaW11eYGNlZmhpamttcXJ0dnd3f4CAg4aGh4iIiY6PkJSWlpeZm5ydoKGjp6mrrK+xs7a5u729vr6/wMTFxsfKzM3P09TV1dbX2NnZ2trd3t/f5OXq6uvt7vDy8vP09Pn7/P39/lgNyDMAAAABYktHRJqY32cSAAAB4klEQVRIx2NgGAV6ORNnEgEm5mjDdPjMrA7wIwIE1sz0htoxM5iZONcwh87UAjNyq5kZZAsbUUEiF4N7LapQuQkDc102WEt/AANDeKMvKphuwDMjDlUoo5GBIbAPrGWmBwNDdCqaG6YaC81QQRVybGNg8JiJpkVKTa3MQU2VDUVL5OQEJtxaSmaAwHRlZC1KM3xn6OPWwsQgwJIVz43isKgqhrxk3FoYGEqTphqh+IWr15nBYrIoHi32MyqYULSYzShKz5/hhFuLeeuE6TECyFqyKsLDw4urcGrh74oUMK23RtLC2K4O5Mj38OJ2GMnxQqoWu3Q4SFOAaOFLQYjFYtGiEw4HIRIQLez+CDEX6jjMqxsO2jUgWgSbEGJFWLTIWcGBpTBEC4sZQkwXixYmfjjggTmMEyHGjkVLxAwEMIRoEZ6EEGrFokVcDQ5UOKC2KCLEZKkQYsTmfSQtMgVoJUwCJ4MbZgmDrIVYANOS60E0yIVqIQmAtfQFEO8waNGXU8NMrA7WhkwwrT0zlEg9rGEzNSEs75l1Qa5EgKCGmZ4w3VqZ/cT4vD9TE3foTxMDUSJTiI+xSkgtwpBTTawO6Zk2EIbtTEliUwXEXcS6DJQqOpph6aOlE0QS0IIzjYwCKAAAIYSIhTiPKfoAAAAASUVORK5CYII=" alt="" />
                    </div>
                    <div className="card-title">
                        <h5>{note.title}</h5>
                    </div>
                    <div className="card-buttons">
                        <p onClick={() => { deleteItem(note._id); props.showAlert("Deleted successfully", "success"); }} ><MdDelete className="mx-2" /></p>
                        <p onClick={() => { updateNote(note) }} ><MdEdit className="mx-2" /></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card2
