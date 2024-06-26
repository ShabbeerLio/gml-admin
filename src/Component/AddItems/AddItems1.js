import React, { useState } from "react";

const AddItems1 = ({ addItem, refClose, showAlert }) => {
    const [category, setCategory] = useState({ category: "" });
    const [subcategories, setSubcategories] = useState([{ name: '', description: '' }]);
    const [image, setImage] = useState(null);
    const [data, setDAta] = useState()


    console.log(category, "category")
    console.log(subcategories, "subcategories")
    console.log(image, "image")
    console.log(data, "data")


    const handleSubcategoryChange = (index, field, value) => {
        const newSubcategories = [...subcategories];
        newSubcategories[index][field] = value;
        setSubcategories(newSubcategories);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleAddSubcategory = () => {
        setSubcategories([...subcategories, { name: '', description: '' }]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addItem(category, subcategories, image);
        setDAta(category, subcategories, image);
        refClose.current.click();
        showAlert("Blog added successfully", "success");
    };
    const onChange = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value });
    };

    return (
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Add Items</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form >
                            <div className="mb-3">
                                <label htmlFor="category" className="form-label">Category</label>
                                <input type="text" className="form-control" id="category" name="category" value={category.category} onChange={onChange} />
                            </div>
                            {subcategories.map((subcategory, index) => (
                                <div key={index}>
                                    <div className="mb-3">
                                        <label htmlFor={`subcategoryName${index}`} className="form-label">Subcategory Name</label>
                                        <input type="text" className="form-control" id={`subcategoryName${index}`} name="name" value={subcategory.name} onChange={(e) => handleSubcategoryChange(index, 'name', e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor={`subcategoryDescription${index}`} className="form-label">Subcategory Description</label>
                                        <input type="text" className="form-control" id={`subcategoryDescription${index}`} name="description" value={subcategory.description} onChange={(e) => handleSubcategoryChange(index, 'description', e.target.value)} />
                                    </div>
                                </div>
                            ))}
                            <button type="button" className="btn btn-secondary" onClick={handleAddSubcategory}>Add Subcategory</button>
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">Image</label>
                                <input type="file" className="form-control" id="image" name="image" onChange={handleImageChange} />
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                        </form>
                    </div>
                    {/* <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
            <button type="button" className="btn btn-primary" onClick={handleClick}>Add</button>
          </div> */}
                </div>
            </div>
        </div >
    );
};

export default AddItems1;
