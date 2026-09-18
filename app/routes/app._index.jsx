import { useEffect, useState } from "react";
import { useFetcher, useLoaderData } from "react-router";

import { authenticate } from "../shopify.server";
import db from "../db.server";


export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);

  const bundles = await db.bundle.findMany({
    where: {
      shop: session.shop,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    bundles: bundles ?? [],
  };
};


export const action = async ({ request }) => {
  const { session } = await authenticate.admin(request);

  const formData = await request.formData();
  const intent = formData.get("intent");


  if (intent === "create") {
    const title = String(formData.get("title") || "").trim();
    const buy = Number(formData.get("buy"));
    const get = Number(formData.get("get"));
    const price = String(formData.get("price") || "").trim();

    if (!title || buy < 1 || get < 1 || !price) {
      return {
        success: false,
        intent: "create",
        error: "Please fill all fields.",
      };
    }

    await db.bundle.create({
      data: {
        shop: session.shop,
        title,
        buy,
        get,
        price,
      },
    });

    return {
      success: true,
      intent: "create",
    };
  }


  if (intent === "delete") {
    const id = Number(formData.get("id"));

    if (!id) {
      return {
        success: false,
        intent: "delete",
        error: "Invalid bundle ID.",
      };
    }

    await db.bundle.deleteMany({
      where: {
        id,
        shop: session.shop,
      },
    });

    return {
      success: true,
      intent: "delete",
    };
  }

  return null;
};


export default function Home() {

  const loaderData = useLoaderData() || {};

  const bundles = loaderData.bundles || [];


  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    title: "Buy 1, Get 1 Free",
    buy: 1,
    get: 1,
    price: "40.00",
  });


  const createFetcher = useFetcher();
  const deleteFetcher = useFetcher();


  useEffect(() => {
    if (
      createFetcher.data?.success &&
      createFetcher.data?.intent === "create"
    ) {
      setShowForm(false);

      setForm({
        title: "Buy 1, Get 1 Free",
        buy: 1,
        get: 1,
        price: "40.00",
      });
    }
  }, [createFetcher.data]);


  const updateForm = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };


  const priceNumber = Number(form.price || 0);

  const currentPrice = Number.isFinite(priceNumber)
    ? priceNumber
    : 0;

  const originalPrice = currentPrice * 2;

  const formattedCurrentPrice =
    currentPrice.toFixed(2);

  const formattedOriginalPrice =
    originalPrice.toFixed(2);

  return (
    <s-page
      heading="Bundle Deals"
      inlineSize="large"
    >

      <s-section>
        <s-stack
          direction="inline"
          justifyContent="space-between"
          alignItems="center"
        >
          <s-stack gap="small">
            <s-heading>
              Bundle Deals
            </s-heading>

            <s-text color="subdued">
              Create your bundle with buy and get offers.
            </s-text>
          </s-stack>

          {!showForm && (
            <s-button
              variant="primary"
              onClick={() => setShowForm(true)}
            >
              Create bundle
            </s-button>
          )}
        </s-stack>
      </s-section>


      {showForm && (
        <>
          <s-box padding="base" />

          <s-section>
            <s-grid
              gridTemplateColumns="1fr 1fr"
              gap="base"
              alignItems="start"
            >

              <s-box
                padding="base"
                borderWidth="base"
                borderColor="base"
                borderRadius="base"
              >
                <s-stack gap="base">

                  {/* FORM HEADER */}

                  <s-stack gap="small">
                    <s-heading>
                      Create Bundle
                    </s-heading>

                    <s-text color="subdued">
                      Configure your bundle offer.
                    </s-text>
                  </s-stack>

                  {/* FORM */}

                  <createFetcher.Form method="post">

                    <input
                      type="hidden"
                      name="intent"
                      value="create"
                    />

                    <s-stack gap="base">


                      <s-text-field
                        label="Title"
                        name="title"
                        value={form.title}
                        placeholder="Buy x, Get y Free"
                        onInput={(event) => {
                          updateForm(
                            "title",
                            event.currentTarget.value
                          );
                        }}
                      />


                      <s-grid
                        gridTemplateColumns="1fr 1fr"
                        gap="base"
                      >
                        <s-number-field
                          label="Buy"
                          name="buy"
                          value={String(form.buy)}
                          min="1"
                          onInput={(event) => {
                            updateForm(
                              "buy",
                              Number(
                                event.currentTarget.value
                              ) || 1
                            );
                          }}
                        />

                        <s-number-field
                          label="Get"
                          name="get"
                          value={String(form.get)}
                          min="1"
                          onInput={(event) => {
                            updateForm(
                              "get",
                              Number(
                                event.currentTarget.value
                              ) || 1
                            );
                          }}
                        />
                      </s-grid>


                      <s-text-field
                        label="Price"
                        name="price"
                        value={form.price}
                        placeholder="40.00"
                        onInput={(event) => {
                          updateForm(
                            "price",
                            event.currentTarget.value
                          );
                        }}
                      />


                      {createFetcher.data?.error && (
                        <s-text tone="critical">
                          {createFetcher.data.error}
                        </s-text>
                      )}


                      <s-stack
                        direction="inline"
                        gap="base"
                      >
                        <s-button
                          type="submit"
                          variant="primary"
                          loading={
                            createFetcher.state !== "idle"
                          }
                        >
                          Save
                        </s-button>

                        <s-button
                          type="button"
                          onClick={() => {
                            setShowForm(false);
                          }}
                        >
                          Cancel
                        </s-button>
                      </s-stack>

                    </s-stack>
                  </createFetcher.Form>
                </s-stack>
              </s-box>


              <s-box
                padding="base"
                borderWidth="base"
                borderColor="base"
                borderRadius="base"
              >
                <s-stack gap="base">

                  {/* PREVIEW HEADER */}

                  <s-stack gap="small">
                    <s-heading>
                      Preview
                    </s-heading>

                    <s-text color="subdued">
                      Preview how your bundle will appear
                      to customers.
                    </s-text>
                  </s-stack>

                  <s-box
                    padding="base"
                    borderRadius="base"
                    background="subdued"
                  >
                    <s-stack gap="small">


                      <s-box
                        padding="base"
                        borderWidth="base"
                        borderColor="base"
                        borderRadius="large"
                        background="base"
                      >
                        <s-stack
                          direction="inline"
                          justifyContent="space-between"
                          alignItems="center"
                          gap="base"
                        >

                          {/* LEFT SIDE */}

                          <s-stack
                            direction="inline"
                            alignItems="center"
                            gap="small"
                          >
                            <s-text>
                              {form.title ||
                                "Buy 1, Get 1 Free"}
                            </s-text>

                            <s-badge>
                              SAVE 50%
                            </s-badge>
                          </s-stack>

                          {/* RIGHT SIDE */}

                          <s-stack
                            gap="small"
                            alignItems="end"
                          >
                            <s-text>
                              <strong>
                                ${formattedCurrentPrice}
                              </strong>
                            </s-text>

                            <s-text color="subdued">
                              <del>
                                ${formattedOriginalPrice}
                              </del>
                            </s-text>
                          </s-stack>

                        </s-stack>
                      </s-box>


                      <s-box
                        padding="base"
                        borderWidth="base"
                        borderColor="base"
                        borderRadius="large"
                        background="subdued"
                      >
                        <s-stack
                          direction="inline"
                          justifyContent="space-between"
                          alignItems="center"
                          gap="base"
                        >

                          {/* LEFT SIDE */}

                          <s-stack
                            direction="inline"
                            alignItems="center"
                            gap="small"
                          >
                            <s-text>
                              Buy 1, Get 2 Free
                            </s-text>

                            <s-badge>
                              SAVE 50%
                            </s-badge>
                          </s-stack>

                          {/* RIGHT SIDE */}
                         
                          <s-stack
                            gap="small"
                            alignItems="end"
                          >
                            <s-text>
                              <strong>
                                $29.99
                              </strong>
                            </s-text>

                            <s-text color="subdued">
                              <del>
                                $59.98
                              </del>
                            </s-text>
                          </s-stack>

                        </s-stack>
                      </s-box>

                    </s-stack>
                  </s-box>

                </s-stack>
              </s-box>
            </s-grid>
          </s-section>
        </>
      )}


      {!showForm && (
        <>
          <s-box padding="base" />

          <s-section>
            <s-stack gap="base">

              {/* EMPTY STATE */}

              {bundles.length === 0 ? (
                <s-box
                  padding="large"
                  borderWidth="base"
                  borderColor="base"
                  borderRadius="base"
                >
                  <s-stack gap="small">

                    <s-heading>
                      No bundles yet
                    </s-heading>

                    <s-text color="subdued">
                      Create your first bundle.
                    </s-text>

                  </s-stack>
                </s-box>
              ) : (

                /* BUNDLE LIST */

                bundles.map((bundle) => (
                  <s-box
                    key={bundle.id}
                    padding="base"
                    borderWidth="base"
                    borderColor="base"
                    borderRadius="base"
                  >
                    <s-grid
                      gridTemplateColumns="2fr 1fr 1fr 1fr auto"
                      gap="base"
                      alignItems="center"
                    >

                      {/* TITLE */}

                      <s-stack gap="small">
                        <s-heading>
                          {bundle.title}
                        </s-heading>

                        <s-text color="subdued">
                          Buy {bundle.buy}, Get{" "}
                          {bundle.get} Free
                        </s-text>
                      </s-stack>

                      {/* BUY */}

                      <s-stack gap="small">
                        <s-text color="subdued">
                          Buy
                        </s-text>

                        <s-text>
                          <strong>
                            {bundle.buy}
                          </strong>
                        </s-text>
                      </s-stack>

                      {/* GET */}

                      <s-stack gap="small">
                        <s-text color="subdued">
                          Get
                        </s-text>

                        <s-text>
                          <strong>
                            {bundle.get}
                          </strong>
                        </s-text>
                      </s-stack>

                      {/* PRICE */}

                      <s-stack gap="small">
                        <s-text color="subdued">
                          Price
                        </s-text>

                        <s-text>
                          <strong>
                            ${bundle.price}
                          </strong>
                        </s-text>
                      </s-stack>

                      {/* DELETE */}

                      <deleteFetcher.Form method="post">

                        <input
                          type="hidden"
                          name="intent"
                          value="delete"
                        />

                        <input
                          type="hidden"
                          name="id"
                          value={bundle.id}
                        />

                        <s-button
                          type="submit"
                          tone="critical"
                          loading={
                            deleteFetcher.state !==
                            "idle"
                          }
                        >
                          Delete
                        </s-button>

                      </deleteFetcher.Form>

                    </s-grid>
                  </s-box>
                ))
              )}

            </s-stack>
          </s-section>
        </>
      )}
    </s-page>
  );
}