import { Models } from "appwrite";

// Define the post type to match your application's post structure
type MockPost = {
  $id: string;
  creator: {
    $id: string;
    name: string;
    imageUrl: string;
    username: string;
  };
  caption: string;
  imageUrl: string;
  imageId: string;
  location: string;
  tags: string[];
  likes: any[]; // You can make this more specific if needed
  $createdAt: string;
  $updatedAt: string;
  userId: string;
};

// Mock creator data
export const mockCreators = [
  {
    $id: "user1",
    name: "Ranjan",
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    username: "alexj",
    accountId: "user1_account",
    email: "alex@example.com",
    bio: "Digital creator and photography enthusiast",
  },
  {
    $id: "user2",
    name: "Abhay",
    imageUrl: "https://randomuser.me/api/portraits/men/41.jpg",
    username: "Abhay",
    accountId: "user2_account",
    email: "alex@example.com",
    bio: "Digital creator and photography enthusiast",
  },
  {
    $id: "user3",
    name: "Radha",
    imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    username: "Radhu",
    accountId: "user3_account",
    email: "alex@example.com",
    bio: "Digital creator and photography enthusiast",
  },
  {
    $id: "user4",
    name: "Sanjay",
    imageUrl: "https://randomuser.me/api/portraits/men/22.jpg",
    username: "Sanjay",
    accountId: "user4_account",
    email: "alex@example.com",
    bio: "Digital creator and photography enthusiast",
  },
  {
    $id: "user5",
    name: "Rahul",
    imageUrl: "https://randomuser.me/api/portraits/men/55.jpg",
    username: "Rahul",
    accountId: "user5_account",
    email: "alex@example.com",
    bio: "Digital creator and photography enthusiast",
  },
  {
    $id: "user6",
    name: "Rohit",
    imageUrl: "https://randomuser.me/api/portraits/men/62.jpg",
    username: "Rohit",
    accountId: "user6_account",
    email: "alex@example.com",
    bio: "Digital creator and photography enthusiast",
  },
  {
    $id: "user7",
    name: "Ravi",
    imageUrl: "https://randomuser.me/api/portraits/men/71.jpg",
    username: "Ravi",
    accountId: "user7_account",
    email: "alex@example.com",
    bio: "Digital creator and photography enthusiast",
  },
  {
    $id: "user8",
    name: "Jyoti",
    imageUrl: "https://randomuser.me/api/portraits/women/33.jpg",
    username: "Jyoti",
    accountId: "user8_account",
    email: "alex@example.com",
    bio: "Digital creator and photography enthusiast",
  },
  {
    $id: "user9",
    name: "Sachin",
    imageUrl: "https://randomuser.me/api/portraits/men/81.jpg",
    username: "Sachin",
    accountId: "user9_account",
    email: "alex@example.com",
    bio: "Digital creator and photography enthusiast",
  },
  {
    $id: "user10",
    name: "Sam Rivera",
    imageUrl: "https://randomuser.me/api/portraits/men/91.jpg",
    username: "samr",
    accountId: "user10_account",
    email: "sam@example.com",
    bio: "Travel blogger and food lover",
  },
  {
    $id: "user11",
    name: "Taylor Kim",
    imageUrl: "https://randomuser.me/api/portraits/women/21.jpg",
    username: "taylork",
    accountId: "user11_account",
    email: "taylor@example.com",
    bio: "Tech enthusiast and software developer",
  }
];

// Generate mock posts (10 per user)
export const generateMockPosts = (): MockPost[] => {
  const mockPosts: MockPost[] = [];
  
  // Use Google images for more realistic content - prioritize known working images
  const googleImages = [
    // Known working images at the top
    "https://images.unsplash.com/photo-1682687220067-dced9a881b56",
    "https://images5.alphacoders.com/124/1246010.jpg",
    "https://m.media-amazon.com/images/I/81RhhkOSCPL.jpg",
    "https://i.pinimg.com/736x/a2/ce/d1/a2ced15e767341f3d7f40d370d840f14.jpg",
    "https://images.unsplash.com/photo-1682687982501-1e58ab814714",
    "https://images.unsplash.com/photo-1682687218147-9806132dc697", 
    "https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1",
    "https://images.unsplash.com/photo-1682687220208-22d7a2543e88",
    // Add more images to ensure we have enough for all posts
    "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg",
    "https://images.pexels.com/photos/1366944/pexels-photo-1366944.jpeg",
    "https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg",
    "https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg",
    "https://images.pexels.com/photos/1433052/pexels-photo-1433052.jpeg",
    "https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg",
    "https://images.pexels.com/photos/1485894/pexels-photo-1485894.jpeg",
    "https://images.pexels.com/photos/1591382/pexels-photo-1591382.jpeg",
    "https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg",
    "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg",
    "https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg",
    "https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg",
    "https://images.pexels.com/photos/1770810/pexels-photo-1770810.jpeg",
    "https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg",
    "https://images.pexels.com/photos/1772125/pexels-photo-1772125.jpeg",
    "https://images.pexels.com/photos/1784578/pexels-photo-1784578.jpeg",
    "https://images.pexels.com/photos/1784577/pexels-photo-1784577.jpeg",
    "https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg",
    "https://images.pexels.com/photos/1851190/pexels-photo-1851190.jpeg",
    "https://images.pexels.com/photos/1852908/pexels-photo-1852908.jpeg"
  ];

  // Create a copy of the images array to ensure we don't modify the original
  const availableImages = [...googleImages];
  
  // Generate 1-3 posts for each creator (instead of 10 for each)
  mockCreators.forEach(creator => {
    // Random number of posts between 1 and 3 for each creator
    const numPosts = Math.floor(Math.random() * 3) + 1;
    
    for (let i = 1; i <= numPosts; i++) {
      const postId = `post_${creator.$id}_${i}`;
      
      // If we're out of images, break the loop
      if (availableImages.length === 0) {
        console.warn("Ran out of unique images for posts");
        break;
      }
      
      // Get a random index from the available images
      const randomIndex = Math.floor(Math.random() * availableImages.length);
      
      // Get the image at that index and remove it from the array
      const selectedImage = availableImages.splice(randomIndex, 1)[0];
      
      mockPosts.push({
        $id: postId,
        creator: {
          $id: creator.$id,
          name: creator.name,
          imageUrl: creator.imageUrl,
          username: creator.username
        },
        caption: `This is post #${i} by ${creator.name}. #socialmedia #content`,
        imageUrl: selectedImage,
        imageId: `image_${postId}`,
        location: i % 3 === 0 ? "New York, NY" : i % 3 === 1 ? "San Francisco, CA" : "Remote",
        tags: ["design", "technology", "social"],
        likes: [],
        $createdAt: new Date(Date.now() - i * 86400000).toISOString(),
        $updatedAt: new Date(Date.now() - i * 86400000 + 3600000).toISOString(),
        userId: creator.$id
      });
    }
  });

  return mockPosts;
};

// Export a ready-to-use array of mock posts
export const mockPosts: MockPost[] = generateMockPosts();