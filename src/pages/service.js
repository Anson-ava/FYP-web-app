import { useEffect, useState } from "react";
import { Link as ReachLink } from "react-router-dom";
import {
  ChakraProvider,
  Container,
  Heading,
  Center,
  VStack,
  Text,
  HStack,
  Button,
  SimpleGrid,
  Image,
  Spinner,
  Link,
} from "@chakra-ui/react";

function Service() {
  const [allPhotos, setAllPhotos] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);
  const [uploadSuccessful, setUploadSuccessful] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [oldPhotos, setOldPhotos] = useState();
  const btnDisable = selectedFile.length <= 0 ? true : false;

  const onInputChange = (e) => {
    let files = e.target.files;
    // console.log(files);
    setSelectedFile(files);
  };

  const onFileUpload = (e) => {
    setShowSpinner(true);
    for (var i = 0; i < selectedFile.length; i++) {
      setOldPhotos((photosNumber) => photosNumber + 1);
      const formData = new FormData();
      formData.append("file", selectedFile[i], selectedFile[i].name);
      uploadFile(formData);
    }

    async function uploadFile(formData) {
      let res = await fetch("http://0.0.0.0:8000/service/uploadfile/", {
        method: "POST",
        body: formData,
      });
      let blob = await res.blob();
      // console.log(blob);
      createObjectURL(blob);
      setUploadSuccessful(!uploadSuccessful);
      setShowSpinner(false);
    }
  };

  useEffect(() => {
    getPhotosNumber();
  }, []);

  function createObjectURL(blob) {
    const imageObjectURL = URL.createObjectURL(blob);
    // console.log(imageObjectURL.split("blob:http://localhost:3000/")[1]);
    setAllPhotos(
      (allPhotos) => [
        ...allPhotos,
        {
          id: allPhotos.length,
          key: imageObjectURL.split("blob:http://localhost:3000/")[1],
          photo_url: imageObjectURL,
        },
      ],
      []
    );
  }

  async function getPhotosNumber() {
    let res = await fetch("http://0.0.0.0:8000/service/getPhotosNumber/", {
      method: "GET",
    });
    let data = await res.json();
    setOldPhotos(data.photos_number / 2);
    for (var i = 1; i <= data.photos_number; i = i + 2) {
      await getOldPhotos(i);
    }
  }

  async function getOldPhotos(i) {
    let res = await fetch("http://0.0.0.0:8000/service/getOldPhotos/" + i, {
      method: "GET",
      cache: "no-cache",
    });
    let blob = await res.blob();
    createObjectURL(blob);
  }

  return (
    <ChakraProvider>
      <Center bg="grey" color="white" padding={8}>
        <VStack spacing={7}>
          <Heading>Photo Detection</Heading>
          <HStack>
            <input
              name="fileInput"
              type="file"
              accept="image/*"
              onChange={onInputChange}
              multiple
            ></input>
            <Button
              size="lg"
              colorScheme="blue"
              borderRadius="10px"
              isDisabled={btnDisable}
              onClick={onFileUpload}
            >
              Upload Photo
            </Button>
            {showSpinner && (
              <Center>
                <Spinner size="xl"></Spinner>
              </Center>
            )}
          </HStack>
          <Text style={{fontWeight: 800, fontSize: 20}}>{oldPhotos} photos detected (Click the photo for the detection details)</Text>
          <SimpleGrid columns={3} spacing={8}>
            {allPhotos.map((photo) => {
              return (
                <Link as={ReachLink} to={"/photo/?id=" + photo.id}>
                  <Image
                    borderRadius={25}
                    boxSize="300px"
                    id={photo["id"]}
                    key={photo["key"]}
                    src={photo["photo_url"]}
                    fallbackSrc="https://via.placeholder.com/150"
                    objectFit="cover"
                  ></Image>
                </Link>
              );
            })}
          </SimpleGrid>
        </VStack>
      </Center>
    </ChakraProvider>
  );
}

export default Service;
