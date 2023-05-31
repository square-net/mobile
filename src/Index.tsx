import { Text, View } from "react-native";
import { useMeQuery } from "./generated/graphql";

function Index() {
    const { data, loading } = useMeQuery({ fetchPolicy: "cache-and-network" });

    return (
        <View>
            <Text>{loading ? "Loading..." : (data && data.me ? data.me.username : "No context provided.")}</Text>
        </View>
    );
}

export default Index;
