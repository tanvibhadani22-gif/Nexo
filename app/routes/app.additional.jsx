
export default function Home() {
  return (
    <s-page heading="Store Manager" inlineSize="large">

      {/* Header */}
      <s-section>
        <s-stack
          direction="inline"
          justifyContent="space-between"
          alignItems="center"
        >
          <s-stack gap="small">
            <s-heading>Welcome back 👋</s-heading>
            <s-text color="subdued">
              Manage your store data from one place.
            </s-text>
          </s-stack>

          <s-button variant="primary" icon="plus">
            Add New
          </s-button>
        </s-stack>
      </s-section>
      {/* Stats */}
      <s-section>
        <s-grid
          gridTemplateColumns="repeat(4, 1fr)"
          gap="base"
        >
          <StatCard
            icon="collection"
            title="Total Items"
            value="0"
            subtitle="All records"
          />
  
          <StatCard
            icon="check-circle"
            title="Active"
            value="0"
            subtitle="Currently active"
          />

          <StatCard
            icon="draft"
            title="Draft"
            value="0"
            subtitle="Saved as draft"
          />

          <StatCard
            icon="calendar"
            title="This Month"
            value="0"
            subtitle="New items"
          />
        </s-grid>
      </s-section>

      {/* Data */}
      <s-section heading="Your data">
        <s-box
          padding="large"
          background="base"
          borderWidth="base"
          borderColor="base"
          borderRadius="large"
        >
          <s-stack gap="large">

            {/* Toolbar */}
            <s-stack
              direction="inline"
              justifyContent="space-between"
              alignItems="center"
            >
              <s-stack gap="small">
                <s-heading>Recent items</s-heading>

                <s-text color="subdued">
                  Your recently added data will appear here.
                </s-text>
              </s-stack>

              <s-stack direction="inline" gap="small">
                <s-button
                  variant="secondary"
                  icon="search"
                >
                  Search
                </s-button>

                <s-button
                  variant="secondary"
                  icon="filter"
                >
                  Filter
                </s-button>
              </s-stack>
            </s-stack>

            <s-divider />

            {/* Empty state */}
            <s-stack
              gap="base"
              alignItems="center"
            >
              <s-box
                padding="large"
                background="subdued"
                borderRadius="large"
              >
                <s-icon
                  type="plus-circle"
                  size="large"
                />
              </s-box>

              <s-stack
                gap="small"
                alignItems="center"
              >
                <s-heading>
                  No data yet
                </s-heading>

                <s-text color="subdued">
                  Create your first item to get started.
                </s-text>
              </s-stack>

              <s-button
                variant="primary"
                icon="plus"
              >
                Add your first item
              </s-button>
            </s-stack>

          </s-stack>
        </s-box>
      </s-section>

      {/* Getting Started */}
      <s-section heading="Getting started">
        <s-grid
          gridTemplateColumns="repeat(3, 1fr)"
          gap="base"
        >
          <StepCard
            icon="plus-circle"
            title="Create an item"
            description="Add your first record using the form."
          />

          <StepCard
            icon="edit"
            title="Manage your data"
            description="Edit, update and organize your records."
          />

          <StepCard
            icon="analytics"
            title="Track everything"
            description="Use the dashboard to monitor your data."
          />
        </s-grid>
      </s-section>

      {/* Quick Actions */}
      <s-section heading="Quick actions">
        <s-grid
          gridTemplateColumns="repeat(3, 1fr)"
          gap="base"
        >
          <ActionCard
            icon="plus"
            title="Add new"
            description="Create a new item"
          />

          <ActionCard
            icon="refresh"
            title="Refresh"
            description="Refresh your dashboard"
          />

          <ActionCard
            icon="settings"
            title="Settings"
            description="Configure your app"
          />
        </s-grid>
      </s-section>

    </s-page>
  );
}



function StatCard({
  icon,
  title,
  value,
  subtitle,
}) {
  return (
    <s-box
      padding="base"
      background="base"
      borderWidth="base"
      borderColor="base"
      borderRadius="large"
    >
      <s-stack gap="base">

        <s-stack
          direction="inline"
          justifyContent="space-between"
          alignItems="center"
        >
          <s-text color="subdued">
            {title}
          </s-text>

          <s-icon type={icon} />
        </s-stack>

        <s-heading>
          {value}
        </s-heading>

        <s-text color="subdued">
          {subtitle}
        </s-text>

      </s-stack>
    </s-box>
  );
}




function StepCard({
  icon,
  title,
  description,
}) {
  return (
    <s-box
      padding="base"
      background="base"
      borderWidth="base"
      borderColor="base"
      borderRadius="large"
    >
      <s-stack gap="base">

        <s-icon
          type={icon}
          size="large"
        />

        <s-stack gap="small">

          <s-heading>
            {title}
          </s-heading>
<s-divider color="strong"></s-divider>
          <s-text color="subdued">
            {description}
          </s-text>

        </s-stack>

      </s-stack>
    </s-box>
  );
}




function ActionCard({
  icon,
  title,
  description,
}) {
  return (
    <s-box
      padding="base"
      background="base"
      borderWidth="base"
      borderColor="base"
      borderRadius="large"
    >
      <s-stack
        direction="inline"
        gap="base"
        alignItems="center"
      >



        <s-icon
          type={icon}
          size="large"
        />

        <s-stack gap="small">

          <s-heading>
            {title}
          </s-heading>
          <s-divider color="strong"></s-divider>

          <s-text color="subdued">
            {description}
          </s-text>

        </s-stack>

      </s-stack>
    </s-box>
  );
}