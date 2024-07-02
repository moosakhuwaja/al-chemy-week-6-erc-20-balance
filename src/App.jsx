import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  SimpleGrid,
  Text,
  Avatar,
  Spinner,
} from '@chakra-ui/react';
import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { useState } from 'react';
import { ethers } from 'ethers';

function App() {
  const [userInput, setUserInput] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [results, setResults] = useState([]);
  const [hasQueried, setHasQueried] = useState(false);
  const [tokenDataObjects, setTokenDataObjects] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getTokenBalance() {
    setLoading(true);
    const config = {
      apiKey: '----alchemy api key----',
      network: Network.ETH_MAINNET,
    };

    const alchemy = new Alchemy(config);
    let address = userInput;

    // Check if the input is an ENS name
    if (userInput.endsWith('.eth')) {
      try {
        address = await alchemy.core.resolveName(userInput);
        setUserAddress(address);
      } catch (error) {
        console.error('Error resolving ENS name:', error);
        setLoading(false);
        return;
      }
    } else {
      setUserAddress(userInput);
    }

    const data = await alchemy.core.getTokenBalances(address);

    setResults(data);

    const tokenDataPromises = data.tokenBalances.map((token) =>
      alchemy.core.getTokenMetadata(token.contractAddress)
    );

    setTokenDataObjects(await Promise.all(tokenDataPromises));
    setHasQueried(true);
    setLoading(false);
  }

  async function connectWallet() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setUserInput(address);
        setUserAddress(address);
      } catch (error) {
        console.error('Error connecting to wallet:', error);
      }
    } else {
      console.error('MetaMask not detected');
    }
  }

  return (
    <Box w="100vw" h="100vh" position="relative">
      <Button
        fontSize={20}
        bgColor="blue"
        position="absolute"
        top="16px"
        right="16px"
        onClick={connectWallet}
      >
        Connect Wallet
      </Button>
      <Center>
        <Flex
          alignItems={'center'}
          justifyContent="center"
          flexDirection={'column'}
        >
          <Heading mb={0} fontSize={36}>
            ERC-20 Token Indexer
          </Heading>
          <Text>
            Plug in an address or ENS name and this website will return all of its ERC-20
            token balances!
          </Text>
        </Flex>
      </Center>
      <Flex
        w="100%"
        flexDirection="column"
        alignItems="center"
        justifyContent={'center'}
      >
        <Heading mt={42}>
          Get all the ERC-20 token balances of this address or ENS name:
        </Heading>
        <Input
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          color="black"
          w="600px"
          textAlign="center"
          p={4}
          bgColor="white"
          fontSize={24}
        />
        <Button fontSize={20} onClick={getTokenBalance} mt={36} bgColor="blue">
          Check ERC-20 Token Balances
        </Button>

        <Heading my={36}>ERC-20 token balances:</Heading>

        {loading ? (
          <Flex justifyContent="center" alignItems="center" h="200px">
            <Spinner size="xl" thickness="14px" speed="0.65s" />
          </Flex>
        ) : hasQueried ? (
          <SimpleGrid w={'90vw'} columns={4} spacing={24}>
            {results.tokenBalances.map((e, i) => {
              return (
                <Flex flexDir={'row'} key={i}>
                  <Avatar
                    name={tokenDataObjects[i].symbol}
                    src={tokenDataObjects[i].logo}
                    borderRadius="50%"
                  />
                  <Flex
                    flexDir={'column'}
                    color="white"
                    w={'20vw'}
                    ml={4}
                  >
                    <Box mt={"8px"} ml={"2px"}>
                      <b>Symbol:</b> ${tokenDataObjects[i].symbol}&nbsp;
                    </Box>
                    <Box>
                      <b>Balance:</b>&nbsp;
                      {Utils.formatUnits(
                        e.tokenBalance,
                        tokenDataObjects[i].decimals
                      )}
                    </Box>
                  </Flex>
                </Flex>
              );
            })}
          </SimpleGrid>
        ) : (
          'Please make a query! This may take a few seconds...'
        )}
      </Flex>
    </Box>
  );
}

export default App;
