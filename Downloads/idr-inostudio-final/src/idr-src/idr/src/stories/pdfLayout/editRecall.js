import React from 'react';
import EditRecall from 'views/dashboard/components/pdf/editRecall';

const Element = () => (
  <div style={{ marginTop: 30 }}>
    <EditRecall />
    <div style={{ position: 'absolute', bottom: 30 }}>
      <EditRecall reverse />
    </div>
  </div>
);

export default <Element />;
