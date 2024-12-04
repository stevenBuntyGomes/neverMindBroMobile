import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import RenderHTML from 'react-native-render-html';
// import InfoBlogs from '../crud/InfoBlogs'; // Assuming you have this component converted for React Native
import { Avatar } from 'react-native-elements';
import { Grid } from 'react-native-paper';
import User from '../User/User';
dayjs.extend(relativeTime);

const BlogCard = ({
    blog,
    categories,
    tags,
    auth,
}) => {
    const contentWidth = Dimensions.get('window').width;
    const navigation = useNavigation();

    const showBlogCategories = () => {
        return (
            <View style={styles.categoryContainer}>
                <Text style={styles.subTitle}>Categories</Text>
                {blog && blog?.categories?.map((category, index) => (
                    <TouchableOpacity
                        key={index}
                        // onPress={() => navigation.navigate('CategoryScreen', { slug: category.slug })}
                        style={styles.categoryButton}
                    >
                        <Text style={styles.buttonText}>{category.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    const showBlogTags = () => {
        return (
            <View style={styles.tagContainer}>
                <Text style={styles.subTitle}>Tags</Text>
                {blog && blog.tags?.map((tag, index) => (
                    <TouchableOpacity
                        key={index}
                        // onPress={() => navigation.navigate('TagScreen', { slug: tag.slug })}
                        style={styles.tagButton}
                    >
                        <Text style={styles.buttonTextTags}>{tag.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    };


  return (
    <ScrollView>
            <View onPress={() => navigation.navigate('SingleBlog', { blogSlug: blog?.slug })} style={styles.card}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.navigate('SingleBlog', { blogSlug: blog?.slug })}>
                        <Text style={styles.title}>{blog && blog.title}</Text>
                    </TouchableOpacity>
                    {/* {auth && auth._id === blog?.postedBy?._id ? (
                        <InfoBlogs blog={blog} />
                    ) : null} */}
                </View>
                <User
                    userId={blog && blog?.postedBy?._id}
                    name={blog && blog?.postedBy?.name}
                    photo={blog && blog?.postedBy?.photo?.url}
                    username={blog && blog?.postedBy?.username}
                    createdAt={blog && blog?.createdAt}
                />
                {/* <View style={styles.userSection}>
                    <Avatar
                        rounded
                        source={{ uri: blog?.postedBy?.photo?.url }}
                        size="medium"
                    />
                    <Text style={styles.userName}>
                        {blog?.postedBy?.name}{"\n"}
                        <Text style={styles.date}>Published {dayjs(blog?.createdAt).fromNow()}</Text>
                    </Text>
                    
                </View> */}
                <View style={styles.row}>
                    {showBlogCategories()}
                    {showBlogTags()}
                </View>
                <View style={styles.row}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            source={{ uri: blog.photo?.url }}
                            alt={blog?.title}
                        />
                    </View>
                    <View style={styles.excerptContainer}>
                        <RenderHTML contentWidth={contentWidth} source={{ html: blog.excerpt }} baseStyle={{ fontSize: 18 }}/>
                        <TouchableOpacity onPress={() => navigation.navigate('SingleBlog', { blogSlug: blog?.slug })}>
                            <Text style={styles.readMore}>Read More</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
  )
}

export default BlogCard

const styles = StyleSheet.create({
    card: {
        // marginLeft: 5,
        // marginRight: 5,
        marginTop: 15,
        marginBottom: 15,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    userSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    userName: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: '500',
    },
    date: {
        marginLeft: 8,
        fontSize: 14,
        color: '#777',
    },
    row: {
        // flexDirection: 'row',
        marginBottom: 16,
    },
    categoryContainer: {
        flex: 1,
        marginRight: 8,
    },
    tagContainer: {
        flex: 1,
        marginLeft: 8,
    },
    subTitle: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 8,
    },
    categoryButton: {
        backgroundColor: '#007bff',
        padding: 8,
        borderRadius: 4,
        marginBottom: 8,
    },
    tagButton: {
        borderColor: '#007bff',
        borderWidth: 1,
        padding: 8,
        borderRadius: 4,
        marginBottom: 8,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
    buttonTextTags: {
        color: '#333',
        textAlign: 'center',
    },
    imageContainer: {
        flex: 1,
        marginRight: 8,
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 8,
    },
    excerptContainer: {
        flex: 2,
        marginLeft: 8,
    },
    readMore: {
        marginTop: 8,
        color: 'black',
        fontWeight: 'bold',
    },
});
