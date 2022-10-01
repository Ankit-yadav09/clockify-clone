import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Spacer,
  Text,
} from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from '../Time_Tracker/SideBar/SideBar';
import Navbar from '../Navbar/Navbar';

const getData = async () => {
  let res = await axios.get('http://localhost:8080/tag');

  return res.data;
};

function Tagsection() {
  const [client, setClient] = useState('');
  const [Allclient, setAllclient] = useState([]);

  console.log(Allclient);

  useEffect(() => {
    getData().then((res) => {
      setAllclient(res);
    });
  }, []);

  console.log(client);

  const handalAdd = async () => {
    await axios.post('http://localhost:8080/tag/new', {
      name: client,
    });

    getData().then((res) => {
      setAllclient(res);
    });
  };

  return (
    <>
      <Box>
        <Navbar />
      </Box>
      <div style={{ display: 'flex' }}>
        <div>
          <SideBar />
        </div>
        <div>
          <div style={{ padding: '20px' }}>
            <Text fontSize="xl" mb={30} px="4" py="4">
              Tags
            </Text>

            <Flex justifyContent="space-between">
              <div style={{ display: 'flex' }}>
                <Select
                  placeholder="Show active"
                  htmlSize={8}
                  width="150px"
                  mr="15px"
                >
                  <option value="option2">Show archived</option>
                  <option value="option3">Show all</option>
                </Select>

                <Input
                  placeholder="Search by name"
                  htmlSize={8}
                  width="150px"
                  mr={600}
                />
              </div>
              <div>
                <Input
                  onChange={(e) => setClient(e.target.value)}
                  placeholder="Add new tag"
                  htmlSize={12}
                  width="150px"
                  mr="15px"
                />
                <Button
                  colorScheme="blue"
                  px="10"
                  py="10px"
                  onClick={handalAdd}
                >
                  Add
                </Button>
              </div>
            </Flex>

            {Allclient &&
              Allclient.map((ele) => (
                <Box bg="aliceblue" h="30" w="100%" color="grey" mt={30}>
                  <Text fontSize="md" px="3">
                    {ele.name}
                  </Text>
                </Box>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Tagsection;
