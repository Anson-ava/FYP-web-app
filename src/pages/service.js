import { useEffect, useState } from "react";

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
} from "@chakra-ui/react";

function Service() {
  const [allPhotos, setAllPhotos] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadSuccessful, setUploadSuccessful] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [oldPhotos, setOldPhotos] = useState();

  const onInputChange = (e) => {
    setSelectedFile(e.target.files);
  };

  const onFileUpload = (e) => {

    async function uploadFile(formData){
      let res = await fetch("http://0.0.0.0:8000/service/uploadfile/", {
        method: "POST",
        body: formData,
      })
      let blob = await res.blob();
      createObjectURL(blob);
      setUploadSuccessful(!uploadSuccessful);
      setShowSpinner(false);
    }

    setShowSpinner(true);
    for (var i = 0; i < selectedFile.length; i++) {
      setOldPhotos((photosNumber) => photosNumber + 1);
      const formData = new FormData();
      formData.append("file", selectedFile[i], selectedFile[i].name);
      uploadFile(formData)
    }
  };
  
  useEffect(() => {
    
    async function getPhotosNumber() {
      let res = await fetch(
        "http://0.0.0.0:8000/service/getPhotosNumber/",
        { method: "GET" }
        );
        let data = await res.json();
      var photosNumber = data.photos_number;
      setOldPhotos(photosNumber);
      for (var i = 1; i <= photosNumber; i++) {
        await getOldPhotos(i);
      }
    }

    async function getOldPhotos(i) {
      let res = await fetch(
        "http://0.0.0.0:8000/service/getOldPhotos/" + i,
        {
          mehtod: "GET",
        }
        );
        let blob = await res.blob();
        createObjectURL(blob);
      }

      getPhotosNumber();
    }, []);

    function createObjectURL(blob) {
      const imageObjectURL = URL.createObjectURL(blob);
      setAllPhotos(
        (existingPhotos) => [
          ...existingPhotos,
          {
            key: imageObjectURL.split("blob:http://localhost:3000/")[1],
            photo_url: imageObjectURL,
          },
        ],
        []
      );
    }
    
  return (
    <ChakraProvider>
      <Center bg="grey" color="white" padding={8}>
        <VStack spacing={7}>
          <Heading>Your photo can be uploaded here</Heading>
          <Text>Your images are listed here</Text>
          <Text>You already detected {oldPhotos} photos</Text>
          <HStack>
            <input
              type="file"
              onChange={onInputChange}
              onClick={null}
              multiple
            ></input>
            <Button
              size="lg"
              colorScheme="blue"
              isDisabled={null}
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
          <Heading>Your photos show here</Heading>
          <SimpleGrid columns={3} spacing={8}>
            {allPhotos.map((photo) => {
              return (
                <Image
                  borderRadius={25}
                  boxSize="300px"
                  key={photo["key"]}
                  src={photo["photo_url"]}
                  fallbackSrc="https://via.placeholder.com/150"
                  objectFit="cover"
                ></Image>
              );
            })}
          </SimpleGrid>
        </VStack>
      </Center>
    </ChakraProvider>
  );
}

export default Service;
