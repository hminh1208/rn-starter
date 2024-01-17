import { useEffect, useState } from "react";
import yelp from "../api/yelp";

export default () => {
    const [results, setResults] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");

    const searchApi = async (term) => {
        try {
            const response = await yelp.get("/search", {
                params: {
                    limit: 50,
                    term,
                    location: "san jose",
                },
            });

            setResults(response.data.businesses);
        } catch (error) {
            setErrorMsg("Something went wrong");
        }
    };

    useEffect(() => {
        searchApi("pasta");
    }, []);

    return [searchApi, results, errorMsg]
};
