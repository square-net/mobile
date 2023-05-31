import { Text, View } from "react-native";
import { useMeQuery } from "./generated/graphql";

function Index() {
    const { data } = useMeQuery({ fetchPolicy: "cache-and-network" });

    return (
        <View>
            <Text>{data?.me?.username}</Text>
        </View>
    );
}

export default Index;
