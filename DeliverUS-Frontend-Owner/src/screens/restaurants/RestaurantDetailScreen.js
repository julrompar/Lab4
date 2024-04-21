/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, Pressable, ImageBackground, TextSemiBold, Image } from 'react-native'
import { getDetail } from '../../api/RestaurantEndpoints'
import TextRegular from '../../components/TextRegular'

import * as GlobalStyles from '../../styles/GlobalStyles'

export default function RestaurantDetailScreen ({ route }) {
  const [restaurant, setRestaurant] = useState({})

  useEffect(() => {
    console.log('Loading restaurant details, please wait 1 second')
    setTimeout(() => {
      setRestaurant(getDetail(route.params.id)) // getDetail function has to be imported
      console.log('Restaurant details loaded')
    }, 1000)
  }, [])
  const renderProduct = ({ item }) => {
    return (
      <Pressable
        style={styles.row}
        onPress={() => { }}>
          <TextRegular>
              {item.name}
          </TextRegular>
      </Pressable>
    )
  }
  const renderHeader = () => {
    return (
    <ImageBackground source={(restaurant?.heroImage) ? { uri: process.env.API_BASE_URL + '/' + restaurant.heroImage, cache: 'force-cache' } : undefined } style={styles.imageBackground}>
    <View style={styles.restaurantHeaderContainer}>
        <TextSemiBold textStyle={styles.textTitle}>{restaurant.name}</TextSemiBold>
        <Image style={styles.image} source={restaurant.logo ? { uri: process.env.API_BASE_URL + '/' + restaurant.logo, cache: 'force-cache' } : undefined} />
        <TextRegular textStyle={styles.text}>{restaurant.description}</TextRegular>
    </View>
  </ImageBackground>)
  }
  return (
    <View style={styles.container}>
        <TextRegular style={styles.textTitle}>{restaurant.name}</TextRegular>
        <TextRegular style={styles.text}>{restaurant.description}</TextRegular>
        <TextRegular style={styles.text}>shippingCosts: {restaurant.shippingCosts}</TextRegular>
        <FlatList
          style={styles.container}
          data={restaurant.products}
          renderItem={renderProduct}
          renderHeader={renderHeader}
          keyExtractor={item => item.id.toString()}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: GlobalStyles.brandSecondary
  },
  restaurantHeaderContainer: {
    height: 250,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'column',
    alignItems: 'center'
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  image: {
    height: 100,
    width: 100,
    margin: 10
  },
  text: {
    color: 'white'
  },
  textTitle: {
    fontSize: 20,
    color: 'white'
  }
})
