import {
  Text,
  Button,
  Table,
  Tooltip,
  Input,
  Popover,
  Checkbox,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useMemo, useRef, useState } from "react";
import { useClickOutside } from "use-events";

const SelectableFilter = (props) => {
  const { type, value, label, onChangeValue, options, onApply, applied } =
    props;
  const [isOpen, setIsOpen] = useState(false);
  const SelectRef = useRef(null);
  const inputRef = useRef(null);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [isActive] = useClickOutside([SelectRef, inputRef], () =>
    setIsSelectorOpen(false)
  );

  const options_ = useMemo(() => {
    if (options) {
      return options.filter((option) => option?.includes(value));
    }

    return [];
  }, [value, options]);

  return (
    <div className="mb-3 py-3" style={{ width: "200px" }}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex   flex-row items-center justify-between mb-1"
      >
        <Text className="hover:opacity-50 cursor-pointer" h6>
          {label} <FontAwesomeIcon icon="caret-down" />
        </Text>
        <Checkbox onChange={onApply} isSelected={applied} />
      </div>
      <div className={`${isOpen ? "block" : "hidden"} relative`}>
        <Input
          placeholder={label}
          ref={inputRef}
          fullWidth
          type={type}
          value={value}
          onFocus={() => setIsSelectorOpen(true)}
          onChange={(e) => onChangeValue(e.target.value)}
          labelRight={<FontAwesomeIcon icon={"arrow-down"} />}
        />
        <ul
          ref={SelectRef}
          className={`m-0 p-0  ${
            isSelectorOpen ? "block" : "hidden"
          }  absolute mt-2  rounded-md border-2 border-warning w-full  bg-white`}
          style={{ zIndex: 999 }}
        >
          {options_.length ? (
            options_.map((option, index) => {
              return (
                <Fragment key={`sec-opt-${index}`}>
                  <li
                    className="p-1 text-sm cursor-pointer hover:opacity-50"
                    onClick={() => {
                      onChangeValue(option);
                      setIsSelectorOpen(false);
                    }}
                  >
                    {option}
                  </li>
                  <hr />
                </Fragment>
              );
            })
          ) : (
            <li className="p-1 text-sm cursor-pointer hover:opacity-50">
              no records !
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

const Filterable = (props) => {
  const { type, value, label, onChangeValue, onApply, applied } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-3" style={{ width: "200px" }}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-row items-center justify-between mb-1"
      >
        <Text className="cursor-pointer hover:opacity-50" h6>
          {label} <FontAwesomeIcon icon="caret-down" />
        </Text>
        <Checkbox onChange={onApply} isSelected={applied} />
      </div>
      <div className={`${isOpen ? "block" : "hidden"}`}>
        <Input
          placeholder={label}
          fullWidth
          type={type}
          value={value}
          onChange={onChangeValue}
        />
      </div>
    </div>
  );
};

export default function Resource(props) {
  const {
    transactions,
    columns,
    data,
    title,
    onSelection,
    rowsPerPage,
    onAdd,
    actions,
  } = props;
  const [filters, setFilters] = useState([
    // {
    //   label: "Transaction ID",
    //   value: "",
    //   type: "text",
    //   applied: false,
    // },
    {
      label: "Transaction Type",
      options: [
        "INSTANT_PAYMENT",
        "TRANSFER",
        "WITHDRAWAL",
        "DEPOSIT",
        "RECEIVE",
      ],
      value: "",
      type: "select",
      applied: false,
    },

    {
      label: "Transaction Status",
      options: ["APPROVED", "PENDING", "REJECTED"],
      value: "",
      type: "select",
      applied: false,
    },
    {
      label: "date",
      value: "",
      type: "date",
      applied: false,
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <div className=" bg-white rounded-xl p-4 ">
        <div className="flex flex-row items-center justify-between">
          <Text h4 transform="capitalize">
            {title}
          </Text>
          <Button size="sm" auto onClick={onAdd}>
            <FontAwesomeIcon icon="plus" size="xl" />
          </Button>
        </div>

        <div className="flex flex-row items-center justify-between mt-3">
          <div>
            <Input
              onChange={(e) => {
                //
                //
                //filter sendID based on the ID
                props.changeWord(e.target.value);
                //setSearchFilter(e.target.value);
                //
              }}
              type="text"
              placeholder="Search"
              color="primary"
              bordered
              labelLeft={<FontAwesomeIcon icon="search" />}
            />
          </div>
        </div>
        <div className="mt-3 flex flex-row w-full justify-between items-center">
          <div className="flex flex-row">
            {filters
              .filter((f) => f.applied)
              .map((filter, index) => {
                return (
                  <Text
                    h6
                    key={`txt-${index}`}
                    onClick={() => {
                      const tmp = [...filters];
                      tmp[index].applied = false;
                      setFilters(tmp);
                    }}
                    css={{ marginRight: 10 }}
                    className="bg-light cursor-pointer  px-2 block py-1  rounded-xl hover:bg-opacity-70 items-center"
                  >
                    {filter.label}
                    <FontAwesomeIcon
                      icon="times"
                      className="ml-2 text-error"
                      size="xs"
                    />
                  </Text>
                );
              })}
          </div>

          <Text h6 css={{ color: "black" }}>
            Total number
            <span className="bg-info inline px-2 py-1 rounded-xl ml-4 text-white">
              {data.length}
            </span>
          </Text>
        </div>
      </div>

      <div className="mt-4">
        <Table
          selectionMode="multiple"
          color="primary"
          headerLined
          onSelectionChange={onSelection}
          border={0}
          sort
          borderWeight={0}
          bgcolor="white"
          css={{
            height: "auto",
            minWidth: "100%",
          }}
          //onSortChange={onSortChange}
        >
          <Table.Header>
            {columns.map((c) => {
              return (
                <Table.Column key={c} allowsSorting>
                  {c}
                </Table.Column>
              );
            })}
            <Table.Column key={"actions"}>actions</Table.Column>
          </Table.Header>
          <Table.Body items={data} loadingState={data?.length}>
            {/* <Table.Body items={data} loadingState={data?.length}> */}

            {(item) => (
              <Table.Row key={item}>
                {(columnKey) => {
                  if (columnKey !== "actions") {
                    return <Table.Cell>{item[columnKey]}</Table.Cell>;
                  } else {
                    return (
                      <Table.Cell>
                        <div className="w-full flex items-center justify-start">
                          {actions.map((action, i) => {
                            return (
                              <Fragment key={`frg-${i}`}>
                                <Tooltip
                                  content={action.tooltip}
                                  color="primary"
                                >
                                  <Button
                                    auto
                                    className="mr-2"
                                    size="xs"
                                    onClick={() => action.handler(item)}
                                    color={action.color}
                                    rounded
                                  >
                                    <FontAwesomeIcon icon={action.icon} />
                                  </Button>
                                </Tooltip>
                              </Fragment>
                            );
                          })}
                        </div>
                      </Table.Cell>
                    );
                  }
                }}
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
