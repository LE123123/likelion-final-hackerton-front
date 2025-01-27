import Layout from "@components/layout";
import FloatingButton from "@components/FloatingButton";
import {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
} from "@heroicons/react/solid";
import Image from "next/image";
import { cls } from "@libs/client/utils";
import { useClubContext } from "@components/provider/ClubContext";
import client from "@libs/client/client";
import { withSsrSession } from "@libs/server/withSession";
import { NextPageContext } from "next";
import { Club } from "@prisma/client";
import { browser } from "process";
import Link from "next/link";
import { ResponsivePie } from "@nivo/pie";
import useSWR from "swr";

// export interface selectionItem {
//   name: string;
//   [key: string]: any;
// }

// export const club: selectionItem[] = [
//   { name: "Likelion" },
//   { name: "Kert" },
//   { name: "L&C" },
//   { name: "GET IT" },
//   { name: "GET-P" },
//   { name: "Gru" },
// ];

interface ExampleProps {
  items: Club[];
  smallVersion?: boolean;
  selected: Club;
  setSelected: Dispatch<SetStateAction<Club>>;
}

export function Example({
  items,
  smallVersion = false,
  selected,
  setSelected,
}: ExampleProps) {
  return (
    <div
      className={cls(
        `flex-grow-1 top-16 z-10`,
        smallVersion ? "w-50" : "w-72"
      )}
    >
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-3 pl-3 pr-10 text-center focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
            <span className="block truncate text-xl font-semibold text-gray-600">
              {selected?.name || "No Selected"}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {items.map((item, itemIdx) => (
                <Listbox.Option
                  key={itemIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active
                        ? "bg-amber-100 text-amber-900"
                        : "text-gray-900"
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected
                            ? "font-medium"
                            : "font-normal"
                        }`}
                      >
                        {item.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

interface CharInfoType {
  type: string;
  value: number;
}

const ChartInfo: Partial<CharInfoType>[] = [
  {
    type: "자산",
    value: 137,
  },
  {
    type: "수입",
    value: 251,
  },
  {
    type: "지출",
    value: 114,
  },
];

const monthExpenditure: any[] = [
  { name: "1월 지출", month: 1 },
  { name: "2월 지출", month: 2 },
  { name: "3월 지출", month: 3 },
  { name: "4월 지출", month: 4 },
  { name: "5월 지출", month: 5 },
  { name: "6월 지출", month: 6 },
  { name: "7월 지출", month: 7 },
  { name: "8월 지출", month: 8 },
  { name: "9월 지출", month: 9 },
  { name: "10월 지출", month: 10 },
  { name: "11월 지출", month: 11 },
  { name: "12월 지출", month: 12 },
];

interface expenditureDetail {
  name: string;
  ratio: number;
  color: string;
}

const expenditureDetail: expenditureDetail[] = [
  { name: "식음료", ratio: 45, color: "bg-green-500" },
  { name: "숙박", ratio: 34, color: "bg-blue-500" },
  { name: "교통", ratio: 13, color: "bg-yellow-500" },
  { name: "교육", ratio: 5, color: "bg-indigo-500" },
];

const MyResponsivePie = ({ data }: any) => {
  console.log("data >> ", data);
  return (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "ruby",
          },
          id: "dots",
        },
        {
          match: {
            id: "c",
          },
          id: "dots",
        },
        {
          match: {
            id: "go",
          },
          id: "dots",
        },
        {
          match: {
            id: "python",
          },
          id: "dots",
        },
        {
          match: {
            id: "scala",
          },
          id: "lines",
        },
        {
          match: {
            id: "lisp",
          },
          id: "lines",
        },
        {
          match: {
            id: "elixir",
          },
          id: "lines",
        },
        {
          match: {
            id: "javascript",
          },
          id: "lines",
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

const ChartComponent = ({
  infoIdx,
  type,
  value,
  selected,
  ...rest
}: any) => {
  return (
    <div
      className={cls(
        `h-20 w-40 cursor-pointer rounded-md border-2 px-2 py-1`,
        selected ? "border-black" : "border-gray-300"
      )}
      {...rest}
    >
      <span
        className={cls(
          `text-sm font-semibold`,
          selected ? "text-black" : "text-gray-300"
        )}
      >
        {type}
      </span>
      <div
        className={cls(
          `text-center text-xl font-bold`,
          selected ? "text-black" : "text-gray-300"
        )}
      >
        {value} 만
      </div>
    </div>
  );
};

const Home = ({ clubs }: { clubs: Club[] }) => {
  const {
    state: { club: selectedClub },
    actions: { setClub: setSelectedClub, setClubOnSession },
  } = useClubContext();

  const [expenditure, setExpenditure] = useState<any>(
    monthExpenditure[0]
  );
  const [selectedChart, setSelectedChart] = useState<
    Partial<CharInfoType>
  >(ChartInfo[0]);

  // localStorage에 clubs를 저장해준다. -> 로그인되어 있는 유저의 클럽정보만 표시해준다.
  if (typeof window !== "undefined") {
    localStorage.setItem("clubs", JSON.stringify(clubs));
  }

  // 먄약에 club이 바뀌면 ContextAPI의 selectedClub이 바뀔것이다.
  useEffect(() => {
    setClubOnSession(selectedClub?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedClub]);

  const [totalAssets, _] = useState<number>(1373240);

  const { data: ExpenditureData } = useSWR<any>(
    `/api/finance/${expenditure.month}/month`
  );

  const { data: IncomeData } = useSWR<any>(
    `/api/finance/${expenditure.month}/month`
  );

  const data2 = [
    {
      id: "javascript",
      label: "javascript",
      value: 320,
      color: "hsl(157, 70%, 50%)",
    },
    {
      id: "haskell",
      label: "haskell",
      value: 293,
      color: "hsl(185, 70%, 50%)",
    },
    {
      id: "c",
      label: "c",
      value: 538,
      color: "hsl(82, 70%, 50%)",
    },
    {
      id: "elixir",
      label: "elixir",
      value: 467,
      color: "hsl(185, 70%, 50%)",
    },
    {
      id: "lisp",
      label: "lisp",
      value: 135,
      color: "hsl(276, 70%, 50%)",
    },
  ];
  return (
    <Layout title="홈" hasTabBar seoTitle="home | Monegement">
      <div className="px-10">
        <div className="mt-2 flex items-center justify-between">
          <Example
            items={clubs}
            selected={selectedClub}
            setSelected={setSelectedClub}
          />
          <div className="relative top-[4px] flex cursor-pointer items-center justify-center gap-5">
            <Link href={`/calender`}>
              <a>
                <div className="relative rounded-md p-[6px] hover:bg-gray-200">
                  <Image
                    src={"/calender.png"}
                    width={25}
                    height={25}
                    alt=""
                  />
                </div>
              </a>
            </Link>
            <div className="relative top-[2px] cursor-pointer rounded-md p-[6px] hover:bg-gray-200">
              <Image
                src={"/hambuger.png"}
                width={25}
                height={25}
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-row items-center space-x-6">
          {ChartInfo.map(({ type, value }, infoIdx) => {
            return (
              <ChartComponent
                type={type}
                value={value}
                infoIdx={infoIdx}
                selected={!!(type === selectedChart.type)}
                onClick={() => {
                  setSelectedChart(ChartInfo[infoIdx]);
                }}
                key={infoIdx}
              />
            );
          })}
        </div>

        {selectedChart.type === "자산" ? (
          <div className="mt-8 flex flex-col items-center">
            <span className="font-semibold">
              {selectedChart.type}
            </span>
            <div className="mt-6 text-[30px] font-bold">
              {totalAssets.toLocaleString("ko-KR")} 원
            </div>
            <div className="relative mt-6 aspect-square w-full">
              <Image
                layout="fill"
                alt="graph2 props"
                src={`/graph2.png`}
                className="z-0 object-contain"
              />
            </div>
          </div>
        ) : null}

        {selectedChart.type === "수입" ? (
          <div className="m-auto aspect-square h-3/4">
            <MyResponsivePie data={data2} />
          </div>
        ) : null}

        {selectedChart.type === "지출" ? (
          <div>
            <div className="mt-10 flex w-full flex-col items-center">
              <div className="flex items-center justify-center gap-40">
                <span className="relative -right-6 text-xl font-bold text-gray-300">
                  총지출
                </span>
                <Example
                  items={monthExpenditure}
                  smallVersion
                  selected={expenditure}
                  setSelected={setExpenditure}
                />
              </div>
              <div className="mt-6 text-[30px] font-bold">
                {ExpenditureData
                  ? ExpenditureData?.filteredData
                      .reduce(
                        (acc: any, item: any) =>
                          acc + item.value,
                        0
                      )
                      .toLocaleString("ko-KR")
                  : 0}
                원
              </div>

              <div className="m-auto flex h-96 w-full flex-row justify-center">
                {ExpenditureData ? (
                  <MyResponsivePie
                    data={ExpenditureData.filteredData}
                  />
                ) : null}
              </div>
            </div>
            {/* <div className="mt-10 mb-4 space-y-4">
              {expenditureDetail.map(
                ({ name, ratio, color }, detailIdx) => {
                  return (
                    <div
                      className="flex flex-row space-x-2"
                      key={detailIdx}
                    >
                      <div
                        className={cls(
                          "mr-6 aspect-square w-6 rounded-md",
                          color
                        )}
                      />
                      <span className="font-bold">{name}</span>
                      <span className="font-semibold text-gray-300">
                        {ratio}%
                      </span>
                    </div>
                  );
                }
              )}
            </div> */}
          </div>
        ) : null}

        <div className="p flex flex-col space-y-5 py-2">
          <FloatingButton href="/bill">
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </FloatingButton>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = withSsrSession(
  async function ({ req }: any) {
    // 여기서는 지금 로그인되어 있는 유저에 대한 모든 동아리 목록을 일단 불러와야 한다.
    // @ts-ignore
    const { clubs } = await client.user.findUnique({
      where: {
        id: req.session.user.id,
      },
      include: {
        clubs: true,
      },
    });

    return {
      props: {
        clubs: JSON.parse(JSON.stringify(clubs)),
      },
    };
  }
);

export default Home;
