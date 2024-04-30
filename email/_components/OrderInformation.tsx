import {
  Button,
  Column,
  Img,
  Row,
  Section,
  Text,
} from "@react-email/components";

type OrderInformationProps = {
  order: { id: string; createdAt: Date; pricePaid: number };
  product: {
    name: string;
  };
};

const dateFormatter = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" });

export default function OrderInformation({
  order,
  product,
}: OrderInformationProps) {
  return (
    <>
      <Section>
        <Row>
          <Column>
            <Text className="mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4">
              Order ID
            </Text>
            <Text className="mt-0 mr-4">{order.id}</Text>
          </Column>
          <Column>
            <Text className="mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4">
              Purchase On
            </Text>
            <Text className="mt-0 mr-4">
              {dateFormatter.format(order.createdAt)}
            </Text>
          </Column>
          <Column>
            <Text className="mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4">
              Price Paid
            </Text>
            <Text className="mt-0 mr-4">{order.pricePaid}</Text>
          </Column>
        </Row>
      </Section>
      <Section className="border border-solid border-gray-500 rounded-t-lg p-4 md:p-6 my-4">
        <Img width="100%" alt="" src="" />
        <Row className="mt-8">
          <Column className="align-bottom">
            <Text className="text-lg font-bold m-0 mr-4">Product Name</Text>
          </Column>
          <Column className="align-bottom">
            <Button
              href={`${process.env.NEXT_PUBLIC_SERVER_URL}/orders/${order.id}`}
              className="bg-black text-white px-6 py-4 rounded text-lg"
            >
              View Order
            </Button>
          </Column>
        </Row>
        <Row>
          <Column>
            <Text className="mb-0 text-gray-500 whitespace-nowrap text-nowrap mr-4">
              Product Description
            </Text>
          </Column>
        </Row>
      </Section>
    </>
  );
}
