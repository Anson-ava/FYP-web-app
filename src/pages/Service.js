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
  const [isSelected, setIsSelected] = useState(false);
  const [uploadSuccessful, setUploadSuccessful] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const onInputChange = (e) => {
    setIsSelected(true);
    setSelectedFile(e.target.files[0]);
  };

  //   const onFileUpload = e => {
  //     setShowSpinner(true);
  //     const formData = new FormData();
  //     formData.append("file", selectedFile, selectedFile.name);
  //     fetch(, {
  //       method: "POST",
  //       body: formData,
  //     })
  //     .then((response) => response.json())
  //     .then((data) => {
  //         setUploadSuccessful(!uploadSuccessful);
  //         setShowSpinner(false);
  //   });
  // };
  // useEffect(() => {
  //   fetch()
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setAllPhotos(data);
  //     });
  // }, [uploadSuccessful]);

  return (
    <ChakraProvider>
      <Center bg="grey" color="white" padding={8}>
        <VStack spacing={7}>
          <Heading>Your photo can be upload here</Heading>
          <Text>Your images are listed here</Text>
          <HStack>
            <input type="file" onChange={onInputChange} onClick={null}></input>
            <Button
              size="lg"
              colorScheme="blue"
              isDisabled={null}
              onClick={null}
            >
              Upload Photo
            </Button>
            {showSpinner && (
              <Center>
                <Spinner size="xl"></Spinner>
              </Center>
            )}
          </HStack>
          <Heading> Your photos show here</Heading>
          <SimpleGrid columns={3} spacing={8}>
            {allPhotos.map((photo) => {
              return (
                <Image
                  borderRadius={25}
                  boxSize="300px"
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