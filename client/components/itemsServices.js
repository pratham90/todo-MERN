export const addItemToServer = async (task, date) => {
    try {
        const response = await fetch( import.meta.env.MODE ==='development' ? "http://localhost:3000/api/todo/createitem":'/api/todo/createitem', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({task, date}),
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const item = await response.json();
        // console.log("raw item", item);
        return mapServerItemToLocalItem(item.TodoItem);
    } catch (error) {
        console.error('Error adding item:', error);
        throw error;
    }
}

export const getItemsFromServer = async () =>{
    const response = await fetch(import.meta.env.MODE ==='development' ? "http://localhost:3000/api/todo/getitem":'/api/todo/getitem');

    const items = await response.json();
    // console.log("raw items", items);
    return items.items.map((item) => mapServerItemToLocalItem(item));
}
export const deleteItemFromServer = async (id)=>{
    const response = await fetch( import.meta.env.MODE ==='development' ? `http://localhost:3000/api/todo/delitem/${id}`:`/api/todo/delitem/${id}`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const item = await response.json();
    return  item._id;

}

export const updateItemFromServer = async (id ,task,date)=>{
    const response = await fetch(import.meta.env.MODE ==='development' ? `http://localhost:3000/api/todo/updateitem/${id}`:`/api/todo/updateitem/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({task,date}),
    })
    const item = await response.json();

    return mapServerItemToLocalItem(item.updatedItem);

}
export const checkItemFromServer = async (id) => {
    const response = await fetch(import.meta.env.MODE ==='development' ? `http://localhost:3000/api/todo/checkitem/${id}`:`/api/todo/checkitem/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
    
    });
    // const item = await response.json();
    return await response.json();
}

const mapServerItemToLocalItem = (serverItem) => {
    return {
      id: serverItem._id ?? "",
      serverItem: serverItem.task ?? "",       // not "MISSING_TASK"
      date: serverItem.date ? serverItem.date.slice(0, 10) : "",            // not "MISSING_DATE"
      isCompleted: serverItem.completed ?? false, 
    };
  };