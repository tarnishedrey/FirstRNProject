import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";

import styles from "./popularjobs.style";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import useFetch from "../../../hook/useFetch";

const Popularjobs = () => {
  const router = useRouter();

  // Fetch job data using the useFetch hook
  const { data, isLoading, error } = useFetch("search", {
    query: "react dev", // Adjust query as needed
    num_pages: 1,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          // Render job list using FlatList and pass fetched data
          <FlatList
            data={data} // Use the API data
            renderItem={({ item }) => (
              <PopularJobCard
                item={item}
                handleCardPress={(job) =>
                  router.push(`/job-details/${job.job_id}`)
                } // Passing the handleCardPress function
              />
            )}
            keyExtractor={(item) => item.job_id.toString()} // Use job_id as key
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
