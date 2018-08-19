import React, { Component } from 'react';
import { View, FlatList, Image, Text } from 'react-native';
import { connectInfiniteHits } from 'react-instantsearch-native';

const Hits = connectInfiniteHits(({ hits, hasMore, refine }) => {

  if (!hits) return <Text>searching.....</Text>
  if (!hits.length) return <Text>No results found</Text>

  const onEndReached = function() {
    if (hasMore) {
      refine();
    }
  };

  return (
    <FlatList
      data={hits}
      onEndReached={onEndReached}
      keyExtractor={(item, index) => item.objectID}
      renderItem={({ item }) => {
        return (
          <View style={{ flexDirection: 'row', alignItems: 'center', margin: 5 }}>
            <Image
              style={{ height: 80, width: 80, marginRight: 5 }}
              source={{ uri: item.image }}
            />
            <View style={{ flex: 1 }}>
              <Text>
                {item.name || item.username || item.displayName}
              </Text>
              {item.salePrice &&
                <Text style={{ marginTop: 5 }}>
                  Rp {item.salePrice}
                </Text>
              }
            </View>
          </View>
        );
      }}
    />
  );
});


export default Hits