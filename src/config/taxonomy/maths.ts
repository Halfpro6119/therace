/**
 * GCSE Maths Taxonomy - Complete structure for Paper 1, 2, 3
 * 
 * This defines:
 * - Units (Number, Algebra, Geometry, Statistics/Probability)
 * - Topics within each unit
 * - Question types per topic
 * 
 * Paper 1: Non-calculator
 * Paper 2 & 3: Calculator allowed
 */

export const MATHS_TAXONOMY = {
  subject: {
    name: 'Maths',
    examBoard: 'Edexcel',
    description: 'GCSE Mathematics',
    icon: '📐',
    themeColor: '#3B82F6',
  },
  papers: [
    {
      paperNumber: 1,
      name: 'Paper 1 (Non-Calculator)',
      calculatorAllowedDefault: false,
    },
    {
      paperNumber: 2,
      name: 'Paper 2 (Calculator)',
      calculatorAllowedDefault: true,
    },
    {
      paperNumber: 3,
      name: 'Paper 3 (Calculator)',
      calculatorAllowedDefault: true,
    },
  ],
  units: [
    {
      name: 'Number',
      orderIndex: 1,
      topics: [
        {
          name: 'Integers and Decimals',
          orderIndex: 1,
          questionTypes: [
            { typeId: 'num_int_add_sub', title: 'Integer Addition & Subtraction', tags: ['basic', 'p1', 'p2', 'p3'] },
            { typeId: 'num_int_mult_div', title: 'Integer Multiplication & Division', tags: ['basic', 'p1', 'p2', 'p3'] },
            { typeId: 'num_dec_operations', title: 'Decimal Operations', tags: ['basic', 'p1', 'p2', 'p3'] },
            { typeId: 'num_order_compare', title: 'Ordering & Comparing Numbers', tags: ['basic', 'p1', 'p2', 'p3'] },
          ],
        },
        {
          name: 'Fractions',
          orderIndex: 2,
          questionTypes: [
            { typeId: 'num_frac_simplify', title: 'Simplifying Fractions', tags: ['basic', 'p1', 'p2', 'p3'] },
            { typeId: 'num_frac_add_sub', title: 'Adding & Subtracting Fractions', tags: ['intermediate', 'p1', 'p2', 'p3'] },
            { typeId: 'num_frac_mult_div', title: 'Multiplying & Dividing Fractions', tags: ['intermediate', 'p1', 'p2', 'p3'] },
            { typeId: 'num_frac_decimal_percent', title: 'Fractions, Decimals & Percentages', tags: ['intermediate', 'p2', 'p3'] },
          ],
        },
        {
          name: 'Percentages',
          orderIndex: 3,
          questionTypes: [
            { typeId: 'num_percent_calc', title: 'Percentage Calculations', tags: ['basic', 'p1', 'p2', 'p3'] },
            { typeId: 'num_percent_change', title: 'Percentage Change', tags: ['intermediate', 'p2', 'p3'] },
            { typeId: 'num_percent_compound', title: 'Compound Interest', tags: ['advanced', 'p2', 'p3'] },
          ],
        },
        {
          name: 'Powers and Roots',
          orderIndex: 4,
          questionTypes: [
            { typeId: 'num_powers_basic', title: 'Powers & Indices', tags: ['basic', 'p1', 'p2', 'p3'] },
            { typeId: 'num_roots', title: 'Square Roots & Cube Roots', tags: ['basic', 'p1', 'p2', 'p3'] },
            { typeId: 'num_surds', title: 'Surds', tags: ['advanced', 'p1', 'p2', 'p3'] },
          ],
        },
        {
          name: 'Standard Form',
          orderIndex: 5,
          questionTypes: [
            { typeId: 'num_std_form_convert', title: 'Converting to Standard Form', tags: ['intermediate', 'p2', 'p3'] },
            { typeId: 'num_std_form_calc', title: 'Calculations with Standard Form', tags: ['intermediate', 'p2', 'p3'] },
          ],
        },
      ],
    },
    {
      name: 'Algebra',
      orderIndex: 2,
      topics: [
        {
          name: 'Expressions and Equations',
          orderIndex: 1,
          questionTypes: [
            { typeId: 'alg_expr_simplify', title: 'Simplifying Expressions', tags: ['basic', 'p1', 'p2', 'p3'] },
            { typeId: 'alg_expr_expand', title: 'Expanding Brackets', tags: ['intermediate', 'p1', 'p2', 'p3'] },
            { typeId: 'alg_expr_factor', title: 'Factorising', tags: ['intermediate', 'p1', 'p2', 'p3'] },
            { typeId: 'alg_eq_linear', title: 'Linear Equations', tags: ['basic', 'p1', 'p2', 'p3'] },
            { typeId: 'alg_eq_quadratic', title: 'Quadratic Equations', tags: ['advanced', 'p1', 'p2', 'p3'] },
          ],
        },
        {
          name: 'Sequences',
          orderIndex: 2,
          questionTypes: [
            { typeId: 'alg_seq_arithmetic', title: 'Arithmetic Sequences', tags: ['intermediate', 'p1', 'p2', 'p3'] },
            { typeId: 'alg_seq_geometric', title: 'Geometric Sequences', tags: ['advanced', 'p2', 'p3'] },
            { typeId: 'alg_seq_nth_term', title: 'nth Term Formula', tags: ['intermediate', 'p1', 'p2', 'p3'] },
          ],
        },
        {
          name: 'Inequalities',
          orderIndex: 3,
          questionTypes: [
            { typeId: 'alg_ineq_linear', title: 'Linear Inequalities', tags: ['intermediate', 'p1', 'p2', 'p3'] },
            { typeId: 'alg_ineq_graphical', title: 'Graphical Inequalities', tags: ['intermediate', 'p2', 'p3'] },
          ],
        },
        {
          name: 'Graphs',
          orderIndex: 4,
          questionTypes: [
            { typeId: 'alg_graph_linear', title: 'Linear Graphs', tags: ['basic', 'p1', 'p2', 'p3'] },
            { typeId: 'alg_graph_quadratic', title: 'Quadratic Graphs', tags: ['intermediate', 'p1', 'p2', 'p3'] },
            { typeId: 'alg_graph_cubic', title: 'Cubic & Reciprocal Graphs', tags: ['advanced', 'p2', 'p3'] },
            { typeId: 'alg_graph_exponential', title: 'Exponential Graphs', tags: ['advanced', 'p2', 'p3'] },
          ],
        },
        {
          name: 'Functions',
          orderIndex: 5,
          questionTypes: [
            { typeId: 'alg_func_notation', title: 'Function Notation', tags: ['intermediate', 'p2', 'p3'] },
            { typeId: 'alg_func_composition', title: 'Function Composition', tags: ['advanced', 'p2', 'p3'] },
            { typeId: 'alg_func_inverse', title: 'Inverse Functions', tags: ['advanced', 'p2', 'p3'] },
          ],
        },
      ],
    },
    {
      name: 'Geometry',
      orderIndex: 3,
      topics: [
        {
          name: 'Angles and Lines',
          orderIndex: 1,
          questionTypes: [
            { typeId: 'geo_angles_basic', title: 'Angle Properties', tags: ['basic', 'p1', 'p2', 'p3'] },
            { typeId: 'geo_angles_parallel', title: 'Parallel Lines & Angles', tags: ['basic', 'p1', 'p2', 'p3'] },
            { typeId: 'geo_angles_triangle', title: 'Triangle Angle Properties', tags: ['basic', 'p1', 'p2', 'p3'] },
            { typeId: 'geo_angles_polygon', title: 'Polygon Angles', tags: ['intermediate', 'p1', 'p2', 'p3'] },
          ],
        },
        {
          name: 'Triangles and Congruence',
          orderIndex: 2,
          questionTypes: [
            { typeId: 'geo_tri_pythagoras', title: 'Pythagoras Theorem', tags: ['intermediate', 'p1', 'p2', 'p3'] },
            { typeId: 'geo_tri_trigonometry', title: 'Trigonometry (SOHCAHTOA)', tags: ['intermediate', 'p1', 'p2', 'p3'] },
            { typeId: 'geo_tri_congruence', title: 'Congruent Triangles', tags: ['intermediate', 'p1', 'p2', 'p3'] },
            { typeId: 'geo_tri_similarity', title: 'Similar Triangles', tags: ['advanced', 'p1', 'p2', 'p3'] },
          ],
        },
        {
          name: 'Circles',
          orderIndex: 3,
          questionTypes: [
            { typeId: 'geo_circle_properties', title: 'Circle Properties', tags: ['intermediate', 'p1', 'p2', 'p3'] },
            { typeId: 'geo_circle_area', title: 'Circle Area & Circumference', tags: ['basic', 'p1', 'p2', 'p3'] },
            { typeId: 'geo_circle_sector', title: 'Sectors & Segments', tags: ['intermediate', 'p2', 'p3'] },
            { typeId: 'geo_circle_theorems', title: 'Circle Theorems', tags: ['advanced', 'p2', 'p3'] },
          ],
        },
        {
          name: 'Transformations',
          orderIndex: 4,
          questionTypes: [
            { typeId: 'geo_trans_reflection', title: 'Reflection', tags: ['basic', 'p1', 'p2', 'p3'] },
            { typeId: 'geo_trans_rotation', title: 'Rotation', tags: ['basic', 'p1', 'p2', 'p3'] },
            { typeId: 'geo_trans_translation', title: 'Translation', tags: ['basic', 'p1', 'p2', 'p3'] },
            { typeId: 'geo_trans_enlargement', title: 'Enlargement', tags: ['intermediate', 'p1', 'p2', 'p3'] },
          ],
        },
        {
          name: 'Vectors',
          orderIndex: 5,
          questionTypes: [
            { typeId: 'geo_vec_notation', title: 'Vector Notation', tags: ['intermediate', 'p2', 'p3'] },
            { typeId: 'geo_vec_operations', title: 'Vector Operations', tags: ['intermediate', 'p2', 'p3'] },
            { typeId: 'geo_vec_geometry', title: 'Vectors in Geometry', tags: ['advanced', 'p2', 'p3'] },
          ],
        },
      ],
    },
    {
      name: 'Statistics & Probability',
      orderIndex: 4,
      topics: [
        {
          name: 'Data Representation',
          orderIndex: 1,
          questionTypes: [
            { typeId: 'stat_data_tables', title: 'Frequency Tables', tags: ['basic', 'p1', 'p2', 'p3'] },
            { typeId: 'stat_data_charts', title: 'Charts & Graphs', tags: ['basic', 'p1', 'p2', 'p3'] },
            { typeId: 'stat_data_histograms', title: 'Histograms', tags: ['intermediate', 'p2', 'p3'] },
            { typeId: 'stat_data_scatter', title: 'Scatter Diagrams', tags: ['intermediate', 'p2', 'p3'] },
          ],
        },
        {
          name: 'Averages and Spread',
          orderIndex: 2,
          questionTypes: [
            { typeId: 'stat_avg_mean', title: 'Mean, Median, Mode', tags: ['basic', 'p1', 'p2', 'p3'] },
            { typeId: 'stat_avg_range', title: 'Range & Quartiles', tags: ['intermediate', 'p1', 'p2', 'p3'] },
            { typeId: 'stat_avg_std_dev', title: 'Standard Deviation', tags: ['advanced', 'p2', 'p3'] },
          ],
        },
        {
          name: 'Probability',
          orderIndex: 3,
          questionTypes: [
            { typeId: 'prob_basic', title: 'Basic Probability', tags: ['basic', 'p1', 'p2', 'p3'] },
            { typeId: 'prob_combined', title: 'Combined Events', tags: ['intermediate', 'p1', 'p2', 'p3'] },
            { typeId: 'prob_conditional', title: 'Conditional Probability', tags: ['advanced', 'p2', 'p3'] },
            { typeId: 'prob_tree_diagram', title: 'Tree Diagrams', tags: ['intermediate', 'p1', 'p2', 'p3'] },
          ],
        },
      ],
    },
  ],
};

/**
 * Helper function to flatten taxonomy for database insertion
 */
export function flattenMathsTaxonomy() {
  const units: any[] = [];
  const topics: any[] = [];
  const questionTypes: any[] = [];

  MATHS_TAXONOMY.units.forEach((unit, unitIdx) => {
    units.push({
      name: unit.name,
      orderIndex: unit.orderIndex,
    });

    unit.topics.forEach((topic, topicIdx) => {
      topics.push({
        unitIndex: unitIdx,
        name: topic.name,
        orderIndex: topic.orderIndex,
      });

      topic.questionTypes.forEach((qt) => {
        questionTypes.push({
          topicIndex: topics.length - 1,
          unitIndex: unitIdx,
          typeId: qt.typeId,
          title: qt.title,
          tags: qt.tags,
          difficultyMin: 1,
          difficultyMax: 9,
          marksMin: 1,
          marksMax: 5,
        });
      });
    });
  });

  return { units, topics, questionTypes };
}
