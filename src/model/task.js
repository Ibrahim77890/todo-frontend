import { v4 as uuidv4} from "uuid";

export const createTask = () => {
    return({
            id: uuidv4(),
            name: "",
            date: "",
            reminder: "",
            add_due_date: "",
            repeat: "",
            category: "",
            important: false,
            completed: false,
});
};
